import { UserService } from '@/service/user.service';
import { ApiResponse } from '@/types/api.response';
import { Rol, UsuarioForm } from '@/types/usuario.type';
import { Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario-insertar',
  imports: [FormsModule],
  templateUrl: './usuario-insertar.html',
  styleUrl: './usuario-insertar.css',
})
export class UsuarioInsertar {
  usuarioForm = model<UsuarioForm>({
    nombre: '',
    nombreUsuario: '',
    contraseña: '',
    idRol: ''
  })

  roles = signal<Rol[]>([])

  private readonly userService = inject(UserService)
  private readonly toastrService = inject(ToastrService)

  uploading = signal(false)

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
    this.usuarioForm.update(value => {
      value.contraseña = value.password!
      return value
    })
    this.uploading.set(true)
    this.userService.insertTrabajador(this.usuarioForm(), establoId)
      .subscribe({
        next: (res: ApiResponse<string>) => {
          this.uploading.set(false)
          this.toastrService.success(res.message)
        }
      })
  }
}
