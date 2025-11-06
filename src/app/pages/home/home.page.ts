import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

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
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent]
})
export class HomePage implements OnInit {
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
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Mitad_del_mundo.JPG/800px-Mitad_del_mundo.JPG'
    },
    {
      id: 3,
      name: 'Centro Histórico',
      category: 'Patrimonio Cultural',
      description: 'Descubre la arquitectura colonial y la rica historia de Quito.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Quito_aerial_view.jpg/800px-Quito_aerial_view.jpg'
    },
    {
      id: 4,
      name: 'Teleférico',
      category: 'Aventura y Naturaleza',
      description: 'Vistas espectaculares de la ciudad desde las alturas del volcán Pichincha.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Teleferico_Quito_01.jpg/800px-Teleferico_Quito_01.jpg'
    },
    {
      id: 5,
      name: 'Basílica del Voto Nacional',
      category: 'Arquitectura Religiosa',
      description: 'Imponente iglesia neogótica con gárgolas únicas de fauna ecuatoriana.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Bas%C3%ADlica_del_Voto_Nacional%2C_Quito%2C_Ecuador%2C_2015-07-22%2C_DD_50.JPG/800px-Bas%C3%ADlica_del_Voto_Nacional%2C_Quito%2C_Ecuador%2C_2015-07-22%2C_DD_50.JPG'
    }
  ];


  constructor() {

  }

  ngOnInit() {
  }

  goToPlaceDetail(placeId: number) {
    console.log('Navegar al lugar:', placeId);
    // Aquí podrías usar el Router para navegar
    // this.router.navigate(['/place-detail', placeId]);
  }
}
