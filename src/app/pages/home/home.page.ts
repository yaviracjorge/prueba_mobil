import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {AuthServices} from "../../services/auth.services";
import {Router, RouterLink} from "@angular/router";
import {PlacesService} from "../../services/places.service";
import {PlaceShowInterface} from "../../interfaces/place-show-interface";

interface Place {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonText,RouterLink]
})
export class HomePage implements OnInit {
  authService = inject(AuthServices);
  placeService = inject(PlacesService)
  router = inject(Router)

  placesUser:PlaceShowInterface[]=[]


  showPlaces(){
    this.placeService.showPlaces().subscribe(res=>{
      this.placesUser = res.map((namePhoto) =>{
        const name:any =  namePhoto.picture.split('/').pop();
        namePhoto.picture = "http://192.168.100.7:8080/places/"+ name;
        return namePhoto;
      })
      console.log(res);
    })
  }

  places: Place[] = [
    {
      id: 1,
      name: 'Calacali',
      category: 'Turismo Comunitario',
      description: 'Un hermoso lugar donde puedes disfrutar de la naturaleza y la cultura local.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Calacali_MitadDelMundo.JPG'
    },
    {
      id: 2,
      name: 'Mitad del Mundo',
      category: 'Monumento Histórico',
      description: 'El famoso monumento que marca la línea ecuatorial del planeta.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Calacali_MitadDelMundo.JPG'
    },
    {
      id: 3,
      name: 'Centro Histórico',
      category: 'Patrimonio Cultural',
      description: 'Descubre la arquitectura colonial y la rica historia de Quito.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Calacali_MitadDelMundo.JPG'
    }
  ];

  get valid(): boolean {
    return this.authService.istoken(); // <-- Esto se ejecutará en cada ciclo de detección de cambios
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
  goToPlaceDetail() {
    this.router.navigate(['/show-place']);
  }
}
