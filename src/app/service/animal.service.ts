import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENVIRONMENTS } from "../../environments/environment";
import { Observable } from "rxjs";
import { ApiResponse } from "@/types/api.response";
import { Animal, AnimalForm, AnimalSimplified, TipoAnimal } from "@/types/animal.type";


@Injectable({
  providedIn: "root"
})
export class AnimalService {
  private http = inject(HttpClient)

  private baseUrl = ""

  constructor() {
    this.baseUrl = ENVIRONMENTS.url
  }

  getTipoAnimales(): Observable<ApiResponse<TipoAnimal[]>> {
    return this.http.get<ApiResponse<TipoAnimal[]>>(this.baseUrl + "/animales/tipo/list")
  }

  insertAnimalExtended(animalForm: AnimalForm, establoId: string): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(this.baseUrl + "/animales/add/extended?establoId=" + establoId, animalForm)
  }

  insertAnimal(animal: AnimalSimplified, establoId: string): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(this.baseUrl + "/animales/add?establoId=" + establoId, animal)
  }

  getAnimales(establoId: string): Observable<ApiResponse<Animal[]>> {
    return this.http.get<ApiResponse<Animal[]>>(this.baseUrl + "/animales/all?establoId=" + establoId)
  }
}
