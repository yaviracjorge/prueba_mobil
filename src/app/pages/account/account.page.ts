import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList, IonListHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {bookmarkOutline,mapOutline,locationOutline,logOutOutline,personCircleOutline} from "ionicons/icons";


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonLabel, IonItem, IonIcon, IonListHeader]
})
export class AccountPage implements OnInit {


  constructor() {
    addIcons({bookmarkOutline,mapOutline,locationOutline,logOutOutline,personCircleOutline})
  }

  ngOnInit() {
  }


}
