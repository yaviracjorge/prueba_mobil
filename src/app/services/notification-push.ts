import {Injectable, OnDestroy} from '@angular/core';
import {ActionPerformed, PushNotifications, PushNotificationSchema, Token} from "@capacitor/push-notifications";
import {LocalNotifications} from "@capacitor/local-notifications";

@Injectable({
  providedIn: 'root'
})
export class NotificationPush implements OnDestroy{
  private listeners: Array<{remove: ()=> Promise<void>}>=[];

  async init(){
    await this.ensureNotificationChannel();
    let permStatus = await PushNotifications.checkPermissions();

    if(permStatus.receive != 'granted')
    {
      permStatus = await PushNotifications.requestPermissions();
    }
    if(permStatus.receive != 'granted')
    {
      console.warn("Permiso denegado para notificaciones push");
      return;
    }

    await PushNotifications.register();
    this.listeners.push(
      await PushNotifications.addListener('registration',(token:Token) =>{

        console.log('Token FCm', token.value);
      })
    );

    this.listeners.push(
      await PushNotifications.addListener('registrationError',(error)=>{
        console.error('Error en Registro de Notificaciones Push', error);
      })
    );

    this.listeners.push(
      await PushNotifications.addListener('pushNotificationReceived',(notif:PushNotificationSchema)=>{
        console.log('Notificacion en Foreground', notif);
      })
    );

    this.listeners.push(
      await PushNotifications.addListener('pushNotificationActionPerformed',(action:ActionPerformed)=>{
        console.log('Usuario interactuo con la notificacion', action.notification.data);
        const  data = action.notification.data?.screen;
        console.log('data', JSON.stringify(data));
      })
    );
  }


   async ngOnDestroy() {
      console.log('Eliminando listeners de Push...');
      for (const listener of this.listeners) {
        await listener.remove();
      }
      this.listeners = [];
    }


  async ensureNotificationChannel() {

    try {
      await LocalNotifications.createChannel({
        id: 'high_importance',
        name: 'Alertas importantes',
        description: 'Canal para notificaciones de alta prioridad',
        importance: 5,
        sound: 'default'
      });

      console.log('Canal de notificación creado o ya existente');
    } catch (err) {
      console.warn('Error creando canal:', err);
    }
  }
}
