import {Component, inject, OnInit} from '@angular/core';
import {
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,

  IonContent,
 IonIcon,

} from "@ionic/angular/standalone";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {LocalitationService} from "../../services/localitation-service";

@Component({
    selector: 'app-prueba',
    templateUrl: './prueba.component.html',
    styleUrls: ['./prueba.component.scss'],
  imports: [
    IonButton,
    ReactiveFormsModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonIcon
  ]
})
export class PruebaComponent  implements OnInit {

  private localtion = inject(LocalitationService);
  private sanitizer = inject(DomSanitizer);
  lat: number = 0;
  lng: number = 0;
  mapUrlSafe?: SafeResourceUrl;

  async getLocationOnce(){
    try {

    const position = await this.localtion.getCurrentPosition();
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
      this.updateMapUrl();
    } catch (e) {
      console.error(e);
    } finally {
      console.log('Location request completed');
    }

  }

  constructor() { }

  ngOnInit() {

  }
  updateMapUrl() {
    if (this.lat && this.lng) {
      const bbox = `${this.lng - 0.01}%2C${this.lat - 0.01}%2C${this.lng + 0.01}%2C${this.lat + 0.01}`;
      const url = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${this.lat}%2C${this.lng}`;
      this.mapUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      this.mapUrlSafe = undefined;
    }
  }

}

//private apiUrl = 'http://localhost:8080/usuarios';
//http = inject(HttpClient)
/* findAll(){
   this.http.get(`${this.apiUrl}/usuarios`).subscribe(res=>{
     console.log(res);
   })

 }*/
