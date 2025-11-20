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
import {cash, create, time, trash} from "ionicons/icons";
import {PlaceInterface} from "../../interfaces/place-interface";

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
    addIcons({ create, trash, time, cash });
  }

  ngOnInit() {}

}
