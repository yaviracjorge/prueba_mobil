import {Component, inject, Input, OnInit} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent, IonFooter,
  IonHeader,
  IonIcon, IonRow,
  IonTitle,
  IonToolbar, ModalController
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {cash, create, time, trash,logOutOutline,mapOutline} from "ionicons/icons";
import {PlaceInterface} from "../../interfaces/place-interface";
import * as L from "leaflet";

@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.component.html',
  styleUrls: ['./modal-details.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonButton,
    IonIcon,
    IonContent,
    IonCol,
    IonFooter,
    IonRow
  ]
})
export class ModalDetailsComponent  implements OnInit {
  @Input() place!: PlaceInterface;
  private modalCtrl = inject(ModalController);

  map!: L.Map
  lat:number = 0;
  lng:number = 0;


  cancel() {
    return this.modalCtrl.dismiss();
  }
  action(type: 'edit' | 'delete') {
    // Cerramos el modal y devolvemos qué acción quiere hacer el usuario
    this.modalCtrl.dismiss({
      action: type,
      place: this.place
    });
  }

  constructor() {
    addIcons({ create, trash, time, cash,logOutOutline,mapOutline });
  }

  ngOnInit() {
    this.lat = this.place.latud;
    this.lng = this.place.lngtud;
    if(this.map){
      this.map.remove();
    }
    this.map = L.map('map-detail',{
      center: [this.lat, this.lng],
      zoom: 12,
      renderer: L.canvas()
    })
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 500);
    this.drawMap();
    this.addMarker();
  }

  drawMap(){
    this.map.setView([this.lat, this.lng], 13);
    L.marker([this.lat, this.lng]).addTo(this.map);
  }
  addMarker(){
    const marker = L.marker([this.lat, this.lng]);
    marker.addTo(this.map);
  }
}
