import { Component, computed, effect, inject, signal } from '@angular/core';
import { SearchAutocomplete } from "@/components/atomics/search-autocomplete/search-autocomplete";
import { Animal } from '@/types/animal.type';
import { AnimalService } from '@/service/animal.service';
import { FormsModule } from '@angular/forms';
import { RegistrarSeca } from "@/components/organics/registrar-seca/registrar-seca";
import { RegistrarAborto } from "@/components/organics/registrar-aborto/registrar-aborto";
import { RegistrarConfirmacion } from "@/components/organics/registrar-confirmacion/registrar-confirmacion";
import { RegistrarPrenez } from "@/components/organics/registrar-prenez/registrar-prenez";
import { RegistrarNacimiento } from "@/components/organics/registrar-nacimiento/registrar-nacimiento";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reproduccion',
  imports: [SearchAutocomplete, FormsModule, RegistrarSeca, RegistrarAborto, RegistrarConfirmacion, RegistrarPrenez, RegistrarNacimiento],
  templateUrl: './reproduccion.html',
  styleUrl: './reproduccion.css',
})
export class Reproduccion {
  tipo = signal("SECA")

  readonly tipos = ["SECA", "ABORTO", "CONFIRMACION DE PREÑEZ", "PREÑEZ", "PARTO"]

  animales = signal<Animal[]>([])
  animalSelectedId = signal("")
  animalService = inject(AnimalService)

  suggestions = computed(() => {
    return this.animales().map(a => a.codigo);
  })

  constructor() {
    effect(() => {
      console.log(this.tipo())
      console.log(this, this.animalSelectedId())
    })
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

  onSearch(search: string) {
    const animal = this.animales().find(animal => animal.codigo === search)
    if (!animal) {
      return
    }
    this.animalSelectedId.set(animal.id)
  }

  changeTipo(event: Event) {
    const target = event.target as HTMLSelectElement
    if (!target) {
      return
    }
    const value = target.value
    this.tipo.set(value)
  }
}
