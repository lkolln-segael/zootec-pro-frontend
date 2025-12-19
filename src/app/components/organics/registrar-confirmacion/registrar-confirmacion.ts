import { ReproduccionService } from '@/service/reproduccion.service';
import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  private toastrService = inject(ToastrService)

  uploading = signal(false)

  uploadConfirmacion() {
    this.uploading.set(true)
    this.reproduccionService.insertReproduccionConfirmacionPrenez(this.tipo(), this.animalId())
      .subscribe({
        next: (res) => {
          this.uploading.set(false)
          this.toastrService.success(res.message)
        }
      })
  }
}
