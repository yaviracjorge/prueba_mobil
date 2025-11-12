import {Component, inject, OnInit} from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {NotificationPush} from "./services/notification-push";
import {AuthServices} from "./services/auth.services";
import { MenuComponent as MainMenuComponent } from "./layout/menu/menu.component";
import { MenuComponent as SignInMenuComponent } from "./layout/singIn/menu/menu.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, MainMenuComponent, SignInMenuComponent],
})
export class AppComponent implements OnInit {
  private notificationPush = inject(NotificationPush)
  private authService = inject(AuthServices)

  get valid(): boolean {
    return this.authService.istoken(); // <-- Esto se ejecutará en cada ciclo de detección de cambios
  }
  constructor() {}

  async ngOnInit() {
    await this.notificationPush.init();
  }
}
