import { Component, computed, inject, model, signal } from '@angular/core';
import { SearchAutocomplete } from "@/components/atomics/search-autocomplete/search-autocomplete";
import { AnimalService } from '@/service/animal.service';
import { Animal, ProduccionForm } from '@/types/animal.type';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-produccion',
  imports: [SearchAutocomplete, FormsModule],
  templateUrl: './produccion.html',
  styleUrl: './produccion.css',
})
export class Produccion {
  animalService = inject(AnimalService)
  toastrService = inject(ToastrService)

  animales = signal<Animal[]>([])
  animalSelectedId = signal("")

  uploading = signal(false)


  produccion = model<ProduccionForm>({
    animalId: '',
    volumen: 0,
    phLeche: 0,
    ureaLeche: 0,
    fechaRegistro: '',
    aflatoxinas: 0
  })

  suggestions = computed(() => {
    return this.animales().map(a => a.codigo)
  })


  onSearch(search: string) {
    const animal = this.animales().find(a => a.codigo === search)
    if (!animal) {
      return
    }
    this.animalSelectedId.set(animal.id)
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


  registrarProduccion() {
    this.uploading.set(true)
    this.produccion.update(value => {
      value.animalId = this.animalSelectedId()
      return value
    })
    this.animalService.insertProduccion(this.produccion()).subscribe({
      next: (res) => {
        this.uploading.set(false)
        this.toastrService.success(res.message)
      }
    })
  }
}
