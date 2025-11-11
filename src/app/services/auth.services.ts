import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthServices {
  private apiUrl = 'http://localhost:8080/auth';
  http = inject(HttpClient)

  register(userData:any){
    return this.http.post(this.apiUrl + '/register',userData);
  }

  login(credentials:any){
    return this.http.post(this.apiUrl + '/login',credentials);
  }
}
