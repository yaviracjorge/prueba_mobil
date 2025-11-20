import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Place} from "../pages/create-route/create-route.page";

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private apiUrl = 'http://192.168.100.7:8080/places';
  http = inject(HttpClient)
  addPlace(place: any) {
    return this.http.post(this.apiUrl + '/create',place)
  }

  showPlaces(){
    return this.http.get<Place[]>(this.apiUrl + '/show')
  }

  deletePlace(id:number){
    return this.http.delete(this.apiUrl + '/delete/'+id)
  }

  updatePlace(id:number,place:any){
    return this.http.put(this.apiUrl + '/update/'+id,place)
  }

}
