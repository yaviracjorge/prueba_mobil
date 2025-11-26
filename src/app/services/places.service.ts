import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PlaceShowInterface} from "../interfaces/place-show-interface";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private apiUrl = environment.apiUrlIp + '/places';
  http = inject(HttpClient)
  addPlace(place: any) {
    return this.http.post(this.apiUrl + '/create',place)
  }

  showPlaces(){
    return this.http.get<PlaceShowInterface[]>(this.apiUrl + '/show')
  }

  deletePlace(id:number){
    return this.http.delete(this.apiUrl + '/delete/'+id)
  }

  editPlace(id:number,place:any){
    return this.http.put(this.apiUrl + '/update/'+id,place)
  }

}
