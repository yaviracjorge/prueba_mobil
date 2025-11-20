import {Component, inject, OnInit} from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {NotificationPush} from "./services/notification-push";



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, ],
})
export class AppComponent implements OnInit {
  private notificationPush = inject(NotificationPush)

  constructor() {}

  async ngOnInit() {
    await this.notificationPush.init();
  }
}
