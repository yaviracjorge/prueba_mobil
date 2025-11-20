import { Injectable } from '@angular/core';
import {NativeBiometric, BiometryType} from '@capgo/capacitor-native-biometric';

@Injectable({
  providedIn: 'root'
})
export class BiometricService {
  private serviceName = 'com.tuapp.auth';

  async isAvailable() {
    try {
      const res = await NativeBiometric.isAvailable();
      console.log('res isAvailable', res);
      return res;
    } catch {
      return {isAvailable: false} as any;
    }
  }

  async authenticate(reason = 'Autentícate con tu huella/Face ID') {
    try {
      await NativeBiometric.verifyIdentity({
        reason,
        title: 'Verificación',
        subtitle: 'Inicio de sesión',
        description: 'Usa la biometría para continuar',
        maxAttempts: 3, // iOS
      });
      return true;
    } catch {
      return false;
    }
  }

  async saveTokenSecure(token: string,role:string) {
    const data = JSON.stringify({token,role});
    await NativeBiometric.setCredentials({
      username: 'auth',
      password: data,
      server: this.serviceName,
    });
  }

  async getTokenSecure(prompt = 'Pon tu huella para entrar') {
    const ok = await this.authenticate(prompt);

    if (!ok) {
      return null;
    }
    const credentials = await NativeBiometric.getCredentials({
      server: this.serviceName,
    }).catch((error) => {
      return null;
    });
    if (credentials && credentials.password) {
      try {
        const parsed = JSON.parse(credentials.password);
        return parsed;
      } catch (e) {
        return null;
      }
    }
    return null;
  }


  async deleteTokenSecure() {
    await NativeBiometric.deleteCredentials({server: this.serviceName});
  }

}
