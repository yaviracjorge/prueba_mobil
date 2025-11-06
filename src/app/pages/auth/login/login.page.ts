import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {FormLoginComponent} from "../../../components/form-login/form-login.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormLoginComponent]
})
export class LoginPage implements OnInit {




  constructor() { }

  ngOnInit() {
  }

}
