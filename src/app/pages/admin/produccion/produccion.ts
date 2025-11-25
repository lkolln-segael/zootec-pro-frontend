import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-produccion',
  imports: [],
  templateUrl: './produccion.html',
  styleUrl: './produccion.css',
})
export class Produccion {
  fields = signal([
    "Animal", "Peso", "Urea", "Aflatoxinas", "Ph", "Fecha de registro"
  ]).asReadonly()
}
