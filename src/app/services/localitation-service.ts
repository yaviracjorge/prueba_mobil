import {Injectable} from '@angular/core';
import {Geolocation, Position} from "@capacitor/geolocation";
import {Toast} from "@capacitor/toast";
import {Haptics, ImpactStyle} from "@capacitor/haptics";

@Injectable({
  providedIn: 'root'
})
export class LocalitationService {

  async getCurrentPosition():Promise<Position>{
    const perm = await Geolocation.checkPermissions();
    if(perm.location != 'granted'){
      const requestPerm = await Geolocation.requestPermissions();

      if(requestPerm.location != 'granted'){
        await Toast.show({text: 'Permiso de localización denegado'});
        throw new Error('Permiso de localización denegado');
      }
    }
    const position = await Geolocation.getCurrentPosition({enableHighAccuracy: true});
    await this.softTap('Localización obtenida');
    return position;

  }

  private async softTap(message?: string) {
   await Haptics.impact({style:ImpactStyle.Heavy});
   if(message) await Toast.show({text:message});
  }
}
