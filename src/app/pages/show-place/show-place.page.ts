import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent
} from '@ionic/angular/standalone';
import {ModalController} from "@ionic/angular/standalone";
import {ModalDetailsComponent} from "../../components/modal-details/modal-details.component";
import {PlaceInterface} from "../../interfaces/place-interface";
import {PlacesService} from "../../services/places.service";
import {PlaceShowInterface} from "../../interfaces/place-show-interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-show-place',
  templateUrl: './show-place.page.html',
  styleUrls: ['./show-place.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle]
})
export class ShowPlacePage implements OnInit {
  private modalCtrl = inject(ModalController);
  placeService = inject(PlacesService);
  router = inject(Router)
  places:PlaceShowInterface[]=[];

   showPlaces(){
     this.placeService.showPlaces().subscribe(res=>{
      this.places = res.map((namePhoto) =>{
        const name:any =  namePhoto.picture.split('/').pop();
        namePhoto.picture = "http://192.168.100.7:8080/places/"+ name;
        return namePhoto;
      })
      console.log(res);
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

  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    console.log("¡La vista va a entrar! 📺 Refrescando datos...");
    this.showPlaces()
    // 2. Aquí es donde debes llamar a tu función para que se
    // ejecute CADA VEZ que vuelves a la pantalla.
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
