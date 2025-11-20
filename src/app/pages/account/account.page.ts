import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
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
import {AuthServices} from "../../services/auth.services";
import {Router,RouterLink} from "@angular/router";


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonLabel, IonItem, IonIcon, IonListHeader, IonButton,RouterLink]
})
export class AccountPage implements OnInit {
  authService = inject(AuthServices);
  route = inject(Router);


  constructor() {
    addIcons({bookmarkOutline,mapOutline,locationOutline,logOutOutline,personCircleOutline})
  }

  logout() {
    this.authService.logout();
    return this.route.navigate(['home']);
  }

  ngOnInit() {
  }


}
