import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
} from '@ionic/angular/standalone';
import {PlacesService} from "../../services/places.service";
import {CameraService} from "../../services/camera.service";

export interface Place {
  name: string;
  description: string;
  provincia: string;
  city: string;
  typePlace: string;
  schedules: string;
  price: string;
  picture: string;
}
@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.page.html',
  styleUrls: ['./create-route.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle]
})
export class CreateRoutePage implements OnInit {
  placeService = inject(PlacesService);


  places:Place[]=[];

  async showPlaces(){
    await this.placeService.showPlaces().subscribe(res=>{
      console.log(res);
      this.places = res
    })
  }


  constructor() {
    this.showPlaces();
  }

  ngOnInit() {
  }

}
