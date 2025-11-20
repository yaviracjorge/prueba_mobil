import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {ModalController} from "@ionic/angular/standalone";
import {ModalDetailsComponent} from "../../components/modal-details/modal-details.component";
import {PlaceInterface} from "../../interfaces/place-interface";
import {PlacesService} from "../../services/places.service";
import {Place} from "../create-route/create-route.page";
import {PlaceShowInterface} from "../../interfaces/place-show-interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-show-place',
  templateUrl: './show-place.page.html',
  styleUrls: ['./show-place.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle]
})
export class ShowPlacePage implements OnInit {
  private modalCtrl = inject(ModalController);
  placeService = inject(PlacesService);
  router = inject(Router)
  places:PlaceShowInterface[]=[];

  async showPlaces(){
    await this.placeService.showPlaces().subscribe(res=>{
      console.log(res);
      this.places = res
    })
  }

  async openModalDetail(place: PlaceInterface){
    const modal = await this.modalCtrl.create({
      component: ModalDetailsComponent,
      componentProps:{
        place:place
      }
    })
    await modal.present()
    const { data } = await modal.onWillDismiss();

    if (data) {
      if (data.action === 'delete') {
        this.delete(data.place);
      } else if (data.action === 'edit') {
        this.edit(data.place);
      }
    }
  }
  constructor() {
    this.showPlaces();
  }

  ngOnInit() {
  }

  private edit(place:PlaceInterface) {
    this.router.navigate(['/create-place'],{state:{place:place}})


  }

  private delete(place:PlaceInterface) {
    const id = place.id;
    if(id){
      this.placeService.deletePlace(id).subscribe(res=>{
        console.log(res, "eliminado");
        this.showPlaces();
      })
    }


  }
}
