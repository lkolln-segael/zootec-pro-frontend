import { AnimalService } from '@/service/animal.service';
import { AnimalForm, TipoAnimal } from '@/types/animal.type';
import { Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parto',
  imports: [FormsModule],
  templateUrl: './parto.html',
  styleUrl: './parto.css',
})
export class Parto {
  tiposAnimal = signal([] as TipoAnimal[])

  genero = signal("HEMBRA")

  animalForm = model({} as AnimalForm)
  animalService = inject(AnimalService)
  ngOnInit() {
    this.animalService.getTipoAnimales()
      .subscribe({
        next: (res) => {
          this.tiposAnimal.set(res.data)
        }
      })
  }

  loadAnimal() {
    this.animalForm.update(value => {
      value.genero = this.genero() === "HEMBRA"
      return value
    })
    const establoId = localStorage.getItem("establoId")
    if (!establoId) { return }
    console.log(this.animalForm())

    this.animalService.insertAnimalExtended(this.animalForm(), establoId).subscribe({
      next: (res) => {
        console.log(res.message)
      }
    })

  }

  changeGenero() {
    this.genero.update(value => {
      if (value === "HEMBRA") {
        return "MACHO"
      }
      return "HEMBRA"
    })
  }
}
