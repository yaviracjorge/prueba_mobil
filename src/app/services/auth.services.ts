import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthServices {
  private apiUrl = 'http://localhost:8080/usuarios';
  http = inject(HttpClient)
  findAll(){
    return this.http.get<any>(`${this.apiUrl}`)
  }
}
