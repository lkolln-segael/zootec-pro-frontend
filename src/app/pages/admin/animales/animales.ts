import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-animales',
  imports: [],
  templateUrl: './animales.html',
  styleUrl: './animales.css',
})
export class Animales {
  fields = signal([
    "Nombre",
    "Descripcion",
    "Codigo",
    "Codigo Ingreso",
    "Codigo Salida",
    "Identificador electronico",
    "Proposito",
    "Color",
    "Fecha nacimiento"
  ])
    .asReadonly()
}
