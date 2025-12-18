import { ReproduccionService } from '@/service/reproduccion.service';
import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-confirmacion',
  imports: [FormsModule],
  templateUrl: './registrar-confirmacion.html',
  styleUrl: './registrar-confirmacion.css',
})
export class RegistrarConfirmacion {
  animalId = input<string>("")
  tipo = signal("")

  private reproduccionService = inject(ReproduccionService)

  uploadConfirmacion() {
    this.reproduccionService.insertReproduccionConfirmacionPrenez(this.tipo(), this.animalId())
      .subscribe({
        next: (res) => {
          console.log(res.message)
        }
      })
  }
}
