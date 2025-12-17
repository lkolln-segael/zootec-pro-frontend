import { UserService } from '@/service/user.service';
import { Rol, UsuarioForm } from '@/types/usuario.type';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-usuario-editar',
  imports: [],
  templateUrl: './usuario-editar.html',
  styleUrl: './usuario-editar.css',
})
export class UsuarioEditar {

  usuarios = signal<UsuarioForm[]>([])

  roles = signal<Rol[]>([])

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
    this.usuarioService.getRoles()
      .subscribe({
        next: (res) => {
          this.roles.set(res)
        }
      })
  }

  editarUser(id: string, event: SubmitEvent) {
    const target = event.target as HTMLFormElement
    if (!target) {
      return
    }
    const establoId = localStorage.getItem("establoId")
    if (!establoId) {
      return
    }
    const nombre = (target.querySelector('[name="nombre"]') as HTMLInputElement).value
    const nombreUsuario = (target.querySelector("[name='nombreUsuario']") as HTMLInputElement).value
    const contraseña = (target.querySelector("[name='contraseña']") as HTMLInputElement).value
    const rol = (target.querySelector("[name='rol']") as HTMLSelectElement).value
    const newUsuario: UsuarioForm = {
      nombre: nombre,
      nombreUsuario: nombreUsuario,
      contraseña: contraseña,
      idRol: rol,
    }

    this.usuarioService.editTrabajador(id, establoId, newUsuario)
      .subscribe({
        next: (res) => {
          console.log(res)
        }
      })
  }
}
