import { ReproduccionService } from '@/service/reproduccion.service';
import { Component, inject, input, signal } from '@angular/core';

@Component({
  selector: 'app-registrar-nacimiento',
  imports: [],
  templateUrl: './registrar-nacimiento.html',
  styleUrl: './registrar-nacimiento.css',
})
export class RegistrarNacimiento {
  animalId = input<string>("");

  numero = signal<string>("")

  private reproduccionService = inject(ReproduccionService)


  uploadNacimiento() {
    this.reproduccionService.insertReproduccionParto(this.numero(), this.animalId())
      .subscribe({
        next: (res) => {
          console.log(res.message)
        }
      })
  }
}
