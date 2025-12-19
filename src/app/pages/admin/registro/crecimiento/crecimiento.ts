import { Component, computed, inject, model, signal } from '@angular/core';
import { SearchAutocomplete } from "@/components/atomics/search-autocomplete/search-autocomplete";
import { AnimalService } from '@/service/animal.service';
import { Animal, DesarrolloCrecimiento, DesarrolloCrecimientoForm } from '@/types/animal.type';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crecimiento',
  imports: [SearchAutocomplete, FormsModule],
  templateUrl: './crecimiento.html',
  styleUrl: './crecimiento.css',
})
export class Crecimiento {
  animalService = inject(AnimalService)
  toastrService = inject(ToastrService)
  animales = signal<Animal[]>([])
  desarrollo = model<DesarrolloCrecimientoForm>({
    estado: '',
    fechaRegistro: new Date().toISOString(),
    pesoActual: 0,
    tamaño: 0,
    condicionCorporal: '',
    unidadesAnimal: '',
    animalId: ''
  })

  animalSelectedId = signal("")
  uploading = signal(false)

  suggestions = computed(() => {
    return this.animales().map(a => a.codigo)
  })

  ngOnInit() {
    const establoId = localStorage.getItem("establoId")
    if (!establoId) {
      return
    }
    this.animalService.getAnimales(establoId).subscribe({
      next: (res) => {
        this.animales.set(res.data)
      }
    })
  }

  onSearch(search: string) {
    const animal = this.animales().find(a => a.codigo === search)
    if (!animal) {
      return
    }
    this.animalSelectedId.set(animal.id)
  }

  registrarCrecimiento() {
    if (!this.animalSelectedId()) {
      this.toastrService.error("Animal no seleccionado. (Dele click en guardar)")
    }
    this.uploading.set(true)
    this.desarrollo.update(value => {
      value.animalId = this.animalSelectedId()
      return value
    })
    this.animalService.insertCrecimiento(this.desarrollo())
      .subscribe({
        next: (res) => {
          console.log(res.data)
          this.uploading.set(false)
          this.toastrService.success(res.data)
        }
      })
  }
}
