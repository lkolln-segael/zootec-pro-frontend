import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENVIRONMENTS } from "../../environments/environment";
import { Enfermedad, EnfermedadData, TipoEnfermedad } from "@/types/enfermedad.type";
import { ApiResponse } from "@/types/api.response";

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

  getEnfermedades() {
    return this.http.get<ApiResponse<Enfermedad[]>>(this.baseUrl + "/enfermedad/list")
  }

  crearEnfermedad(enfermedad: EnfermedadData) {
    return this.http.post<string>(this.baseUrl + "/enfermedad/animal/add", { ...enfermedad })
  }

  getEnfermedadesAño(año: number) {
    return this.http.get<ApiResponse<Enfermedad[]>>(this.baseUrl + `/enfermedad/list?año=${año}`)
  }
}
