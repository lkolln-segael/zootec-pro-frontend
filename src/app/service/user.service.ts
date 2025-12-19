import { ENVIRONMENTS } from "@/../environments/environment"
import { ApiResponse } from "@/types/api.response";
import { Rol, UsuarioForm } from "@/types/usuario.type";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Observable } from "rxjs";


type Role = {
  authority: string
}

@Injectable({
  providedIn: "root"
})
export class UserService {


  private http = inject(HttpClient)
  private baseUrl = ""
  constructor() {
    this.baseUrl = ENVIRONMENTS.url
  }

  loginUsuario(nombreUsuario: string, contraseña: string): Observable<HttpResponse<{ token: string }>> {
    return this.http.post<{ token: string }>(this.baseUrl + "/login", {
      "nombreUsuario": nombreUsuario, "contraseña": contraseña
    }, {
      observe: "response"
    })
  }

  isAdminAuthenticated() {
    const token = sessionStorage.getItem("token")
    if (!token) {
      return false
    }
    const decoded: JwtPayload & { role: Role[] } = jwtDecode(token)
    return decoded["role"][0]["authority"] === "ROLE_ADMIN"
  }
  isVeterinarioAuthenticated(): boolean {
    const token = sessionStorage.getItem("token")
    if (!token) {
      return false
    }
    const decoded: JwtPayload & { role: Role[] } = jwtDecode(token)
    return decoded["role"][0]["authority"] === "ROLE_VETERINARIO"
  }
  isOperarioAuthenticated(): boolean {
    const token = sessionStorage.getItem("token")
    if (!token) {
      return false
    }
    const decoded: JwtPayload & { role: Role[] } = jwtDecode(token)
    return decoded["role"][0]["authority"] === "ROLE_OPERARIO"
  }
  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.baseUrl + "/rol/list", {
      headers: {
        "Cache-Control": "public, max-age=3000;"
      }
    })
  }

  getUsuarios(establoId: string): Observable<UsuarioForm[]> {
    return this.http.get<UsuarioForm[]>(this.baseUrl + `/users?establoId=${establoId}`)
  }

  register(usuarioForm: UsuarioForm): Observable<string> {
    return this.http.post<string>(this.baseUrl + "/register", { ...usuarioForm })
  }

  insertTrabajador(usuarioForm: UsuarioForm, establoId: string): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(this.baseUrl + `/users/add?establoId=${establoId}`, { ...usuarioForm })
  }

  getTrabajadores(establoId: string): Observable<UsuarioForm[]> {
    return this.http.get<UsuarioForm[]>(this.baseUrl + `/users?establoId=${establoId}`)
  }

  editTrabajador(id: string, establoId: string, usuarioForm: UsuarioForm): Observable<string> {
    return this.http.put<string>(this.baseUrl + `/users/edit/${id}?establoId=${establoId}`, { ...usuarioForm })
  }
}
