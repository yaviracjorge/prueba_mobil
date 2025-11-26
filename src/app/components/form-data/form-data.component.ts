  import {Component, inject, Input, OnInit} from '@angular/core';
  import {
    IonButton, IonCard, IonCol, IonContent, IonGrid, IonIcon, IonInput,
    IonItem, IonLabel, IonList, IonNote, IonRow, IonTextarea, LoadingController
  } from "@ionic/angular/standalone";
  import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
  import {hasNumberValidator} from "../../util/customValidator";
  import {CameraService, SavedPhoto} from "../../services/camera.service";
  import {PlacesService} from "../../services/places.service";
  import {Router} from "@angular/router";
  import * as L from "leaflet";
  import {trash} from "ionicons/icons";
  import {addIcons} from "ionicons";
  import {LocalitationService} from "../../services/localitation-service";


  @Component({
    selector: 'app-form-data',
    templateUrl: './form-data.component.html',
    styleUrls: ['./form-data.component.scss'],
    imports: [
      IonButton, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonList,
      IonRow, IonTextarea, ReactiveFormsModule, IonNote, IonCard, IonIcon, IonContent
    ]
  })
  export class FormDataComponent implements OnInit {
    cameraService = inject(CameraService);
    formBuilder = inject(FormBuilder);
    placeService = inject(PlacesService);
    loadingController = inject(LoadingController);
    router = inject(Router);
    locationService = inject(LocalitationService);
    private _placeEdit: any;
    lat: number | undefined;
    lng: number | undefined;
    private currentMarker: L.Marker | undefined;
    map!: L.Map;
    photos: SavedPhoto[] = [];


    //Entender esta parte
    @Input() set placeEdit(valor: any) {
      this._placeEdit = valor;
      if (valor) {
        this.form.patchValue(valor);

        // MODO EDITAR: Si hay coordenadas, inicializamos el mapa
        if (valor.latud && valor.lngtud) {
          this.lat = valor.latud;
          this.lng = valor.lngtud;

          // Damos un respiro para que el DOM cargue y creamos el mapa
          setTimeout(() => this.initMap(), 100);
        }
      } else {
        this.form.reset();
        // MODO CREAR: No definimos lat/lng, ni creamos el mapa aún.
        this.lat = undefined;
        this.lng = undefined;

        // Si el mapa existía de antes (por haber editado otro), lo borramos
        if (this.map) {
          this.map.remove();
          this.map = undefined!; // Lo marcamos como inexistente
        }
      }
    }
    //hasta aqui
    get placeEdit() {
      return this._placeEdit;
    }




    form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      provincia: ['', [Validators.required, hasNumberValidator(), Validators.maxLength(10)]],
      city: ['', [Validators.required, hasNumberValidator(), Validators.maxLength(10)]],
      typePlace: ['', [Validators.required, hasNumberValidator(), Validators.maxLength(10)]],
      picture: ['', [Validators.required]],
      latud: [0, [Validators.required]],
      lngtud: [0, [Validators.required]],
      price: ['', [Validators.required, Validators.min(0), Validators.max(1000)]],
    });


    get name() {
      return this.form.controls['name'];
    }

    get description() {
      return this.form.controls['description'];
    }

    get provincia() {
      return this.form.controls['provincia'];
    }

    get city() {
      return this.form.controls['city'];
    }

    get typePlace() {
      return this.form.controls['typePlace'];
    }

    get picture() {
      return this.form.controls['picture'];
    }

    get latud() {
      return this.form.controls['latud'];
    }

    get lngtud() {
      return this.form.controls['lngtud'];
    }

    get price() {
      return this.form.controls['price'];
    }

    constructor() {
      addIcons({trash});
    }

    async onTakePhoto() {
      try {
        const photo = await this.cameraService.takePhoto();
        const saved = await this.cameraService.savePhoto(photo);
        this.updatePicture(saved.photoBase64);
        this.photos = [saved, ...this.photos];
      } catch (e) {
        console.error(e);
      }
    }

    updatePicture(newPhoto: string | undefined) {
      this.form.patchValue({picture: newPhoto});
    }
    clearExistingPhoto() {
      // Limpiamos el valor del formulario
      this.form.patchValue({ picture: '' });
    }
    async deletePhoto(p: SavedPhoto) {
      await this.cameraService.deletePhoto(p.fileName);
      this.photos = this.photos.filter(x => x.fileName !== p.fileName);
      if (this.photos.length === 0) {
        this.updatePicture(''); // Limpia el Base64 del formulario
      }
    }

    async onSubmit() {
      if (this.form.valid) {
        if (this.placeEdit && this.placeEdit.id) {
          const loading = await this.loadingController.create({message: 'Procesando...'});
          await loading.present();
          this.placeService.editPlace(this.placeEdit.id, this.form.value).subscribe({
            next: (res) => {
              loading.dismiss();
              alert('Lugar actualizado con éxito');
              this.form.reset();
              this.router.navigate(['/home']);
            },
            error: (err) => {
              loading.dismiss();
              console.error(err);
            }
          })
        } else {
          console.log("Datos del formulario:", this.form.value);
          const loading = await this.loadingController.create({message: 'Procesando...'});
          await loading.present();
          this.placeService.addPlace(this.form.value).subscribe({
            next: (res) => {
              loading.dismiss();
              alert('Lugar guardado con éxito');
              this.form.reset();
              this.router.navigate(['/home']);
            },
            error: (err) => {
              loading.dismiss();
              console.error(err);
            }
          });
        }
      }
    }


    async getLocation() {
      const loading = await this.loadingController.create({message: 'Obteniendo GPS...'});
      await loading.present();

      try {
        const position = await this.locationService.getCurrentPosition();

        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this.updateLocationForm();

        // MODO CREAR (Botón): Ahora que tenemos coordenadas, iniciamos el mapa
        this.initMap();

      } catch (error) {
        console.error(error);
        alert('No se pudo obtener la ubicación');
      } finally {
        loading.dismiss();
      }
    }
    ngOnInit() {
    }
    private initMap() {
      // Si no hay coordenadas, no hacemos nada
      if (!this.lat || !this.lng) return;

      // Si el mapa ya existe, solo lo movemos
      if (this.map) {
        this.map.setView([this.lat, this.lng], 13);
        this.addMarker(this.lat, this.lng);
        return;
      }
      // SI NO EXISTE, LO CREAMOS
      this.map = L.map('map', {
        center: [this.lat, this.lng],
        zoom: 13,
        renderer: L.canvas()
      });

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);

      this.addMarker(this.lat, this.lng);

      // Arreglo del gris
      setTimeout(() => {
        this.map.invalidateSize();
      }, 200);
    }

    addMarker(lat: number, lng: number) {
      if (this.currentMarker) {
        this.map.removeLayer(this.currentMarker); // Borramos el viejo
      }

      this.currentMarker = L.marker([lat, lng]);
      this.currentMarker.addTo(this.map);
    }
    updateLocationForm() {
      this.form.patchValue({
        latud: this.lat,
        lngtud: this.lng
      });
    }
  }
