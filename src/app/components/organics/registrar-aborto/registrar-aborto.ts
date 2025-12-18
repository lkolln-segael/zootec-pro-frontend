import { ReproduccionService } from '@/service/reproduccion.service';
import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-aborto',
  imports: [FormsModule],
  templateUrl: './registrar-aborto.html',
  styleUrl: './registrar-aborto.css',
})
export class RegistrarAborto {
  animalId = input<string>("")
  tipo = signal("")

  private reproduccionService = inject(ReproduccionService)

  uploadAnimal() {
    this.reproduccionService.insertReproduccionAborto(this.tipo(), this.animalId())
      .subscribe({
        next: (res) => {
          console.log(res.message)
        }
      })
  }
}
