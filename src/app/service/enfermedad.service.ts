import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENVIRONMENTS } from "../../environments/environment";
import { TipoEnfermedad } from "@/types/enfermedad.type";

@Injectable({
  providedIn: "root"
})
export class EnfermedadService {

  private http = inject(HttpClient)
  private baseUrl = ""

  constructor() {
    this.baseUrl = ENVIRONMENTS.url
  }

  getTipoEnfermedades() {
    return this.http.get<TipoEnfermedad[]>(this.baseUrl + "/enfermedad/tipo")
  }
}
