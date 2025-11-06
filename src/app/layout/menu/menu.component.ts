import { Component, OnInit } from '@angular/core';
import {
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs
} from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { home, person } from 'ionicons/icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
  ]
})
export class MenuComponent  implements OnInit {

  constructor() {
    addIcons({ home, person })
  }

  ngOnInit() {}

}
