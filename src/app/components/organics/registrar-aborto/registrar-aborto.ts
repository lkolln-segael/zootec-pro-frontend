import { ReproduccionService } from '@/service/reproduccion.service';
import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar-aborto',
  imports: [FormsModule],
  templateUrl: './registrar-aborto.html',
  styleUrl: './registrar-aborto.css',
})
export class RegistrarAborto {
  animalId = input<string>("")
  tipo = signal("")

  private toastService = inject(ToastrService)
  private reproduccionService = inject(ReproduccionService)

  uploading = signal(false)

  uploadAnimal() {
    this.uploading.set(true)
    this.reproduccionService.insertReproduccionAborto(this.tipo(), this.animalId())
      .subscribe({
        next: (res) => {
          this.uploading.set(false)
          this.toastService.success(res.message)
        }
      })
  }
}
