import { EstabloService } from '@/service/establos.service';
import { Establo } from '@/types/establo.type';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { jwtDecode } from "jwt-decode"

@Component({
  selector: 'app-establos',
  imports: [RouterLink],
  templateUrl: './establos.html',
  styleUrl: './establos.css',
})
export class EstablosPage {
  establos = signal([] as Establo[])

  establoService = inject(EstabloService)

  ngOnInit() {
    const token = sessionStorage.getItem("token")
    if (!token) { return }
    const credential = jwtDecode(token)
    const usuario = credential.sub
    if (!usuario) { return }
    this.establoService.getEstablos(usuario).subscribe({
      next: (res) => {
        this.establos.set(res.data)
      }
    })
  }

  storeEstabloId(establoId: string) {
    localStorage.setItem("establoId", establoId)
  }
}
