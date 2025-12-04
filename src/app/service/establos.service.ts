import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENVIRONMENTS } from "../../environments/environment";
import { Observable } from "rxjs";
import { ApiResponse } from "@/types/api.response";
import { Establo } from "@/types/establo.type";



@Injectable({
  providedIn: "root"
})
export class EstabloService {
  private http = inject(HttpClient)
  private baseUrl = ""

  constructor() {
    this.baseUrl = ENVIRONMENTS.url
  }

  getEstablos(userId: string): Observable<ApiResponse<Establo[]>> {
    return this.http.get<ApiResponse<Establo[]>>(this.baseUrl + "/establos/list?userName=" + userId)
  }
}
