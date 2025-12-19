import { AnimalService } from '@/service/animal.service';
import { AnimalSimplified, TipoAnimal } from '@/types/animal.type';
import { Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-animal',
  imports: [FormsModule],
  templateUrl: './animal.html',
  styleUrl: './animal.css',
})
export class Animal {

  tipoAnimales = signal([] as TipoAnimal[])
  genero = signal("HEMBRA")

  animalForm = model({} as AnimalSimplified)
  private establoId: string | null = ""

  private animalService = inject(AnimalService)
  private toastrService = inject(ToastrService)
  uploading = signal(false)

  constructor() {
    this.establoId = localStorage.getItem("establoId")
  }
  ngOnInit() {
    this.animalService.getTipoAnimales()
      .subscribe({
        next: (res) => {
          this.tipoAnimales.set(res.data)
        }
      })
  }

  loadAnimal() {
    this.uploading.set(true)
    this.animalForm.update(value => {
      value.genero = this.genero() === "HEMBRA"
      return value
    })
    this.animalService.insertAnimal(this.animalForm(), this.establoId!)
      .subscribe({
        next: (res) => {
          console.log(res.message)
          this.uploading.set(false)
          this.toastrService.success(res.message)
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
