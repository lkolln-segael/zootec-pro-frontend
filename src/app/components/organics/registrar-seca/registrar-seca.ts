import { ReproduccionService } from '@/service/reproduccion.service';
import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar-seca',
  imports: [FormsModule],
  templateUrl: './registrar-seca.html',
  styleUrl: './registrar-seca.css',
})
export class RegistrarSeca {
  animalId = input<string>("")
  motivo = signal("")

  uploading = signal(false)

  private readonly reproduccionService = inject(ReproduccionService)
  private toastrService = inject(ToastrService)

  uploadSeca() {
    this.uploading.set(true)
    this.reproduccionService.insertReproduccionSeca(this.motivo(), this.animalId())
      .subscribe({
        next: (res) => {
          this.uploading.set(false)
          this.toastrService.success(res.message)
        }
      })
  }
}
