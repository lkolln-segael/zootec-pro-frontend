import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-enfermedades',
  imports: [],
  templateUrl: './enfermedades.html',
  styleUrl: './enfermedades.css',
})
export class Enfermedades {
  fields = signal(["Nombre",
    "Tratamientos", "Sintomas", "Animal"
  ]).asReadonly()
}
