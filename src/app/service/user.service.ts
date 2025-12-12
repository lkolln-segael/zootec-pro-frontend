import { ENVIRONMENTS } from "@/../environments/environment"
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
}
