import { Component, computed, inject, input, model, signal } from '@angular/core';
import { SearchAutocomplete } from "@/components/atomics/search-autocomplete/search-autocomplete";
import { AnimalService } from '@/service/animal.service';
import { Animal } from '@/types/animal.type';
import { PrenezForm } from '@/types/reproduccion.type';
import { FormsModule } from '@angular/forms';
import { ReproduccionService } from '@/service/reproduccion.service';

@Component({
  selector: 'app-registrar-prenez',
  imports: [SearchAutocomplete, FormsModule],
  templateUrl: './registrar-prenez.html',
  styleUrl: './registrar-prenez.css',
})
export class RegistrarPrenez {

  animalId = input<string>("")

  prenez = model<PrenezForm>({
    fechaCelo: new Date(),
    fechaInseminacion: new Date(),
    fechaDiagnostico: new Date(),
    padreId: '',
    madreId: ''
  })

  private animalService = inject(AnimalService)
  private reproduccionService = inject(ReproduccionService)

  animales = signal<Animal[]>([])
  suggestions = computed(() => {
    return this.animales().map(animal => {
      return animal.codigo
    })
  })

  padreSelectedId = signal("")
  madreSelectedId = signal("")
  onSearchPadre(search: string) {
    this.padreSelectedId.set(search)
  }
  onSearchMadre(search: string) {
    this.madreSelectedId.set(search)
  }
  ngOnInit() {
    const establoId = localStorage.getItem("establoId")
    if (!establoId) {
      return
    }
    this.animalService.getAnimales(establoId)
      .subscribe({
        next: (res) => {
          this.animales.set(res.data)
        }
      })
  }

  uploadPrenez() {
    this.prenez.update(value => {
      value.padreId = this.padreSelectedId()
      value.madreId = this.madreSelectedId()
      return value
    })
    this.reproduccionService.insertReproduccionPreñez(this.animalId(), this.prenez())
      .subscribe({
        next: (res) => {
          console.log(res.message)
        }
      })
  }
}
