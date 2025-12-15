import { UserService } from '@/service/user.service';
import { UsuarioForm } from '@/types/usuario.type';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-usuario-editar',
  imports: [],
  templateUrl: './usuario-editar.html',
  styleUrl: './usuario-editar.css',
})
export class UsuarioEditar {

  usuarios = signal<UsuarioForm[]>([])

  private readonly usuarioService = inject(UserService)

  ngOnInit() {
    const establoId = localStorage.getItem("establoId")
    if (!establoId) {
      return
    }
    this.usuarioService.getUsuarios(establoId)
      .subscribe({
        next: (res) => {
          this.usuarios.set(res)
        }
      })
  }
}
