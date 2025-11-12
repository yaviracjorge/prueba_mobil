import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthServices {
  private apiUrl = 'http://localhost:8080/auth';
  //private apiUrl = 'http://10.0.2.2:8080/api/auth';

  http = inject(HttpClient)

  register(userData:any){
    return this.http.post(this.apiUrl + '/register',userData);
  }

  login(credentials:any){
    return this.http.post(this.apiUrl + '/login',credentials);
  }

  istoken(){
    const tokenExist = sessionStorage.getItem("token")
    if(tokenExist){
      console.log('tokenExist',tokenExist);
      return true
    }
    return false
  }

}
