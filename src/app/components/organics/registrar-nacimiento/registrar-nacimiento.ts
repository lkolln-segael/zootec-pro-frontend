import { ReproduccionService } from '@/service/reproduccion.service';
import { Component, inject, input, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
  private toastrService = inject(ToastrService)

  uploading = signal(false)

  uploadNacimiento() {
    this.uploading.set(true)
    this.reproduccionService.insertReproduccionParto(this.numero(), this.animalId())
      .subscribe({
        next: (res) => {
          this.uploading.set(false)
          this.toastrService.success(res.message)
        }
      })
  }
}
