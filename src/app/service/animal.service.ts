import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENVIRONMENTS } from "../../environments/environment";
import { Observable } from "rxjs";
import { ApiResponse } from "@/types/api.response";
import { Animal, AnimalForm, AnimalSimplified, DesarrolloCrecimientoForm, Produccion, ProduccionForm, TipoAnimal } from "@/types/animal.type";


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

  insertProduccion(produccionForm: ProduccionForm): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(this.baseUrl + "/produccion/add", { ...produccionForm })
  }

  getProducciones(): Observable<ApiResponse<Produccion[]>> {
    return this.http.get<ApiResponse<Produccion[]>>(this.baseUrl + "/produccion/list")
  }

  getProduccionesByAño(establoId: string, año: number): Observable<ApiResponse<Produccion[]>> {
    return this.http.get<ApiResponse<Produccion[]>>(this.baseUrl + `/produccion/lechera?establoId=${establoId}&año=${año}`)
  }

  insertCrecimiento(desarrollo: DesarrolloCrecimientoForm): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(this.baseUrl + "/animales/desarrollo/add", { ...desarrollo })
  }
}
