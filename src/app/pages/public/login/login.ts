import { UserService } from '@/service/user.service';
import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

type Usuario = {
  nombreUsuario: string,
  password: string
}


@Component({
  selector: 'app-login-component',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginPage {

  usuarioService = inject(UserService)
  router = inject(Router)

  usuario = model({
    nombreUsuario: "",
    password: ""
  } as Usuario)

  login() {
    this.usuarioService.loginUsuario(this.usuario().nombreUsuario,
      this.usuario().password).subscribe({
        next: (res) => {
          if (res.status !== 200) {
            alert("Fallo al authenticar")
          }
          const token = res.body!.token
          if (!token) { return }
          sessionStorage.setItem("token", token)
          this.router.navigateByUrl("/establos")
        }
      })
  }
}
