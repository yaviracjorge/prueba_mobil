import {Component, inject, OnInit} from '@angular/core';
import {IonButton, IonIcon, IonTabBar, IonTabButton, IonTabs,ModalController} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {
  home,
  person,
  addCircleOutline, options,
} from "ionicons/icons";
import {ModalComponent, OptionModal} from "../../../components/modal/modal.component";

@Component({
    selector: 'app-menu1',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
  imports: [
    IonIcon,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonButton
  ]
})
export class MenuComponent  implements OnInit {
  private modalCtrl = inject(ModalController);



  constructor() {
    addIcons({home,person,addCircleOutline})
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
