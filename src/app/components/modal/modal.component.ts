import {Component, inject, Input, OnInit} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonIcon,
  IonInput,
  IonItem, IonLabel, IonList,
  IonTitle,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

export interface OptionModal {
  text: string;
  icon?: string;
  action: 'navegar' | 'dismiss';
  route?: string;
  rol?: string;
  data?: any;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonContent,
    IonItem,
    FormsModule,
    IonList,
    IonIcon,
    IonLabel
  ]
})
export class ModalComponent  implements OnInit {
  @Input() title: string = 'Opciones';
  @Input() options: OptionModal[] = [];
  private router= inject(Router);
  private modalCtrl= inject(ModalController);

  constructor() {}

  cancel() {
    return this.modalCtrl.dismiss();
  }

  async navigateAndClose(option: OptionModal) {

    if (option.action === 'navegar') {
      await this.modalCtrl.dismiss();
      if (option.route) {
        this.router.navigate([option.route]);
      }
    }
    else if (option.action === 'dismiss') {
      this.modalCtrl.dismiss(option.data, option.rol);
    }
  }

  ngOnInit() {}

}
