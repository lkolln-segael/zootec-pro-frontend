import { EnfermedadService } from '@/service/enfermedad.service';
import { Enfermedad } from '@/types/enfermedad.type';
import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-enfermedades',
  imports: [DatePipe],
  templateUrl: './enfermedades.html',
  styleUrl: './enfermedades.css',
})
export class Enfermedades {
  fields = signal(["Nombre",
    "Tratamientos", "Sintomas", "Animal", "Fecha registro"
  ]).asReadonly()
  enfermedadService = inject(EnfermedadService)

  enfermedades = signal<Enfermedad[]>([])


  ngOnInit() {
    this.enfermedadService.getEnfermedades().subscribe({
      next: (res) => {
        this.enfermedades.set(res.data)
      }
    })
  }
}
