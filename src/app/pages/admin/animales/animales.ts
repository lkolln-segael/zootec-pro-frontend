import { AnimalService } from '@/service/animal.service';
import { Animal, AnimalForm } from '@/types/animal.type';
import { Component, inject, signal } from '@angular/core';
import { DesarrolloComponent } from "@/components/atomics/desarrollo-component/desarrollo-component";
import { Reproduccion } from "@/components/atomics/reproduccion/reproduccion";

@Component({
  selector: 'app-animales',
  imports: [DesarrolloComponent, Reproduccion],
  templateUrl: './animales.html',
  styleUrl: './animales.css',
})
export class Animales {
  fields = signal([
    "ID", "descripcion", "codigo", "identificador electronico", "proposito", "color", "Fecha de nacimiento"
    , "observaciones", "genero", "tipo de animal"
  ]).asReadonly()


  animales = signal([] as Animal[])

  private animalService = inject(AnimalService)

  ngOnInit() {
    const establoId = localStorage.getItem("establoId")!
    this.animalService.getAnimales(establoId)
      .subscribe({
        next: (res) => {
          this.animales.set(res.data)
        }
      })
  }
}
