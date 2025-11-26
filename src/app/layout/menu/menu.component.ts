import {Component, inject, OnInit} from '@angular/core';
import {
  IonIcon, IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs, ModalController
} from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import {addCircleOutline, home, person} from 'ionicons/icons';
import {AuthServices} from "../../services/auth.services";
import {ModalComponent, OptionModal} from "../../components/modal/modal.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    RouterLink,
  ]
})
export class MenuComponent  implements OnInit {
  private authService = inject(AuthServices)
  private modalCtrl = inject(ModalController);
  constructor() {
    addIcons({ home, person,addCircleOutline })
  }

  get isLogged() {
    return this.authService.istoken()
  }
  async openModal() {
    const optionCreation:OptionModal[]= [
      {
        text:'Crear Un Lugar Turistico',
        icon:person,
        action:'navegar',
        route:'/create-place'
      },
      {
        text:'Crear Una Ruta Turistica',
        icon:addCircleOutline,
        action:'navegar',
        route:'/create-route'
      }
    ]
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps:{
        title:'Menú',
        options:optionCreation
      }
    });
    modal.present();

  }
  ngOnInit() {}


}
