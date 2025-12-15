import { UserService } from '@/service/user.service';
import { Rol, UsuarioForm } from '@/types/usuario.type';
import { Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-insertar',
  imports: [FormsModule],
  templateUrl: './usuario-insertar.html',
  styleUrl: './usuario-insertar.css',
})
export class UsuarioInsertar {
  usuarioForm = model({} as UsuarioForm)

  roles = signal<Rol[]>([])

  private readonly userService = inject(UserService)

  ngOnInit() {
    this.userService.getRoles()
      .subscribe({
        next: (res) => {
          this.roles.set(res)
        }
      })
  }

  uploadUsuario() {
    const establoId = localStorage.getItem("establoId")
    if (!establoId) {
      return
    }
    console.log(this.usuarioForm())
    this.userService.insertTrabajador(this.usuarioForm(), establoId)
      .subscribe({
        next: (res: string) => {
          console.log(res)
        }
      })
  }
}
