import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yavirac.diarioturistico',
  appName: 'DiarioTuristico',
  webDir: 'www',
  plugins: {
  PushNotifications: {
    presentationOptions: ["badge", "sound", "alert"]
  }
}

};

export default config;
