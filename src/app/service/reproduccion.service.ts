import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENVIRONMENTS } from "../../environments/environment";
import { ApiResponse } from "@/types/api.response";
import { PrenezForm } from "@/types/reproduccion.type";


@Injectable({
  providedIn: "root"
})
export class ReproduccionService {
  private httpClient = inject(HttpClient)
  private baseUrl = ENVIRONMENTS.url

  insertReproduccionSeca(motivo: string, animalId: string) {
    return this.httpClient.post<ApiResponse<string>>(this.baseUrl + `/reproducciones/seca?animalId=${animalId}`,
      { motivo: motivo })
  }

  insertReproduccionPreñez(animalId: string, prenezForm: PrenezForm) {
    return this.httpClient.post<ApiResponse<string>>(this.baseUrl + `/reproducciones/prenez?animalId=${animalId}`,
      { ...prenezForm })
  }

  insertReproduccionParto(numero: string, animalId: string) {
    return this.httpClient.post<ApiResponse<string>>(this.baseUrl + `/reproducciones/parto?animalId=${animalId}`,
      { numero: numero })
  }

  insertReproduccionConfirmacionPrenez(tipo: string, animalId: string) {
    return this.httpClient.post<ApiResponse<string>>(this.baseUrl + `/reproducciones/confirmacion-prenez?animalId=${animalId}`,
      { tipo: tipo })
  }

  insertReproduccionAborto(tipo: string, animalId: string) {
    return this.httpClient.post<ApiResponse<string>>(this.baseUrl + `/reproducciones/aborto?animalId=${animalId}`,
      { tipo: tipo })
  }

  getReproducciones(animalId: string) {
    return this.httpClient.get<ApiResponse<Record<string, any>[]>>(this.baseUrl + `/reproducciones?animalId=${animalId}`)
  }
}
