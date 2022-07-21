import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeDemande } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class TypeDemandeService {
private baseURL = "http://localhost:8081/typedemande/getAll";
  constructor(private httpClient : HttpClient) { }
 
  getTypeDemandeList(): Observable<TypeDemande[]>{
    return this.httpClient.get<TypeDemande[]>(`${this.baseURL}`);
  }
}