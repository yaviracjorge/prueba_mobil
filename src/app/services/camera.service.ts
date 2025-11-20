import { Injectable } from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import {Haptics, ImpactStyle} from '@capacitor/haptics';
import {Toast} from '@capacitor/toast';
import {Directory, Filesystem} from '@capacitor/filesystem';
import {Capacitor} from "@capacitor/core";

export interface SavedPhoto {
  fileName: string;
  webviewPath: string;
  timestamp: number;
  photoBase64?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private PHOTOS_DIR = 'photos';
  async takePhoto(): Promise<Photo> {
    const photo: Photo = await Camera.getPhoto({
      source: CameraSource.Prompt,
      resultType: CameraResultType.Uri,
      quality: 85,
      saveToGallery: true,
      promptLabelHeader: 'Elegir',
      promptLabelPhoto: 'Abrir galeria',
      promptLabelPicture: 'Usar cámara'
    });

    await this.successTap('Foto tomada');

    return photo;
  }

  async savePhoto(photo: Photo): Promise<SavedPhoto> {
    const base64 = await this.readAsBase64(photo);

    const fileName = `${Date.now()}.jpeg`;

    await Filesystem.mkdir({
      path: this.PHOTOS_DIR,
      directory: Directory.Data,
      recursive: true
    }).catch(() => {
    });
    await Filesystem.writeFile({
      path: `${this.PHOTOS_DIR}/${fileName}`,
      data: base64,
      directory: Directory.Data
    });

    const uri = await Filesystem.getUri({
      path: `${this.PHOTOS_DIR}/${fileName}`,
      directory: Directory.Data
    });

    console.log(JSON.stringify(uri));

    const webviewPath = Capacitor.convertFileSrc(uri.uri);

    console.log('webviewPath', webviewPath);

    await this.successTap('Foto guardada localmente');

    return {fileName, webviewPath, timestamp: Date.now(), photoBase64: base64};
  }


  async loadAllPhotos(): Promise<SavedPhoto[]> {
    try {
      const dir = await Filesystem.readdir(
        {path: this.PHOTOS_DIR, directory: Directory.Data}
      );

      const photos: SavedPhoto[] = [];

      for (const file of dir.files) {
        const uri = await Filesystem.getUri({path: `${this.PHOTOS_DIR}/${file.name}`, directory: Directory.Data});
        const webviewPath = Capacitor.convertFileSrc(uri.uri);
        photos.push(
          {
            fileName: file.name,
            webviewPath,
            timestamp: Number(file.name.split('.')[0]) || Date.now()
          }
        );
      }
      // return photos.sort((a, b) => b.timestamp - a.timestamp);
      return photos;
    } catch (e) {
      return [];
    }
  }


  async deletePhoto(fileName: string) {
    await Filesystem.deleteFile({path: `${this.PHOTOS_DIR}/${fileName}`, directory: Directory.Data});

    await Toast.show({text: 'Foto eliminada'});
  }

  private async readAsBase64(photo: Photo): Promise<string> {
    const response = await fetch(photo.webPath!);

    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }


  async successTap(message?: string) {
    await Haptics.impact({style: ImpactStyle.Heavy});

    if (message) await Toast.show({text: message});
  }

  async softTap(message?: string) {
    await Haptics.impact({style: ImpactStyle.Light});

    if (message) await Toast.show({text: message});
  }

}
