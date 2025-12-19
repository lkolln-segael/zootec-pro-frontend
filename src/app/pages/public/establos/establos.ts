import { EstabloService } from '@/service/establos.service';
import { UserService } from '@/service/user.service';
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

  authority = signal("operario")

  establoService = inject(EstabloService)

  usuarioService = inject(UserService)

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
    if (this.usuarioService.isAdminAuthenticated()) {
      this.authority.set("admin")
    }
    if (this.usuarioService.isVeterinarioAuthenticated()) {
      this.authority.set("veterinario")
    }
    if (this.usuarioService.isOperarioAuthenticated()) {
      this.authority.set("operario")
    }
  }

  storeEstabloId(establoId: string) {
    localStorage.setItem("establoId", establoId)
  }
}
