import { EstabloService } from '@/service/establos.service';
import { Establo } from '@/types/establo.type';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-establo-editar',
  imports: [FormsModule],
  templateUrl: './establo-editar.html',
  styleUrl: './establo-editar.css',
})
export class EstabloEditar {

  establoId = signal<string>("")

  establo = signal<Establo>({
    id: '',
    nombre: '',
    sistemaProduccion: '',
    capacidadMaxima: '',
    areaTotal: '',
    areaPasto: '',
    areaBosque: '',
    areaCultivos: '',
    areaConstruida: '',
    ubicacion: '',
    fechaCreacion: new Date(),
    fechaModificacion: new Date()
  })
  private readonly establoService = inject(EstabloService)

  ngOnInit() {
    const establoId = localStorage.getItem("establoId")
    if (!establoId) {
      return
    }
    this.establoId.set(establoId)
    const token = sessionStorage.getItem("token")
    if (!token) {
      return
    }
    this.establoService.getEstablo(establoId)
      .subscribe({
        next: (res) => {
          this.establo.set(res.data)
        }
      })
  }

  uploadEstablo() {
    this.establoService.updateEstablo(this.establoId(), this.establo())
      .subscribe({
        next: (res) => {
          console.log(res)
        }
      })
  }
}
