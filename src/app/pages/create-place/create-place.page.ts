import {Component, computed, effect, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {FormDataComponent} from "../../components/form-data/form-data.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.page.html',
  styleUrls: ['./create-place.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FormDataComponent]
})
export class CreatePlacePage implements OnInit {
  router = inject(Router)
  placeData:any;
  constructor() {
    /*// 1. Capturamos la navegación actual
    const navigation = this.router.getCurrentNavigation();

    // 2. Verificamos si trae "extras" y "state" antes de intentar leer
    if (navigation?.extras?.state) {

      // 3. Extraemos el lugar
      const placeRecibido = navigation.extras.state['place'];
      this.placeData = placeRecibido;
      console.log("¡Llegó el paquete! 📦", placeRecibido);
    }else {
      this.placeData = null;
    }*/
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    console.log("Entrando a la página... revisando mochila 🎒");

    // history.state es la forma nativa de ver qué datos trajo la navegación
    if (history.state.place) {
      this.placeData = history.state.place;
      console.log("Modo Editar: Datos cargados", this.placeData);
    } else {
      this.placeData = null;
      console.log("Modo Crear: Datos limpios");
    }
  }
}
