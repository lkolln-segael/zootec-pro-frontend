import { ReproduccionService } from '@/service/reproduccion.service';
import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-seca',
  imports: [FormsModule],
  templateUrl: './registrar-seca.html',
  styleUrl: './registrar-seca.css',
})
export class RegistrarSeca {
  animalId = input<string>("")
  motivo = signal("")

  private readonly reproduccionService = inject(ReproduccionService)

  uploadSeca() {
    this.reproduccionService.insertReproduccionSeca(this.motivo(), this.animalId())
      .subscribe({
        next: (res) => {
          console.log(res.message)
        }
      })
  }
}
