import { AnimalService } from '@/service/animal.service';
import { Component, inject, signal } from '@angular/core';
import { Produccion as ProduccionModel } from '@/types/animal.type';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-produccion',
  imports: [DatePipe],
  templateUrl: './produccion.html',
  styleUrl: './produccion.css',
})
export class Produccion {
  fields = signal([
    "Animal", "Volumen", "Urea", "Aflatoxinas", "Ph", "Fecha de registro"
  ]).asReadonly()

  producciones = signal<ProduccionModel[]>([])

  animalService = inject(AnimalService)
  ngOnInit() {
    this.animalService.getProducciones()
      .subscribe({
        next: (res) => {
          this.producciones.set(res.data)
        }
      })
  }
}
