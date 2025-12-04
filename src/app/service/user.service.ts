import { ENVIRONMENTS } from "@/../environments/environment"
import { HttpClient, HttpResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";


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


}
