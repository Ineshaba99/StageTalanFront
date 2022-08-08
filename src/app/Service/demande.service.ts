import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demande, Employee } from '../employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

 
  private baseURL = "http://localhost:8081/demande/demande";
  constructor(private httpClient : HttpClient) { }
 
  createDemande(demande: Demande): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, demande);
  }
}
