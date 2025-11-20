import {Component, inject, OnInit, signal} from '@angular/core';
import {
  IonButton, IonCard, IonCol, IonContent, IonGrid, IonIcon, IonInput,
  IonItem, IonLabel, IonList, IonNote, IonRow, IonTextarea, LoadingController
} from "@ionic/angular/standalone";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {hasNumberValidator} from "../../util/customValidator";
import {CameraService, SavedPhoto} from "../../services/camera.service";
import {PlacesService} from "../../services/places.service";
import {Router} from "@angular/router";
import {trash} from "ionicons/icons";
import {addIcons} from "ionicons";

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

  isEditMode = signal<boolean>(false);
  placeData = signal<any>(null);

  photos: SavedPhoto[] = [];

  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    provincia: ['', [Validators.required, hasNumberValidator(), Validators.maxLength(10)]],
    city: ['', [Validators.required, hasNumberValidator(), Validators.maxLength(10)]],
    typePlace: ['', [Validators.required, hasNumberValidator(), Validators.maxLength(10)]],
    picture: ['', [Validators.required]],
    schedules: [''],
    price: ['', [Validators.required, Validators.min(0), Validators.max(1000)]],
  });

  // ... Getters (name, description, etc) ...
  get name() { return this.form.controls['name']; }
  get description() { return this.form.controls['description']; }
  get provincia() { return this.form.controls['provincia']; }
  get city() { return this.form.controls['city']; }
  get typePlace() { return this.form.controls['typePlace']; }
  get picture() { return this.form.controls['picture']; }
  get schedules() { return this.form.controls['schedules']; }
  get price() { return this.form.controls['price']; }

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

  async deletePhoto(p: SavedPhoto) {
    // Opcional: Limpiar el control del formulario si borran la foto
    this.updatePicture('');
    this.photos = [];
  }

  updatePicture(newPhoto: string | undefined) {
    this.form.patchValue({picture: newPhoto});
  }

  async onSubmit() {
    if (this.form.valid) {
      const loading = await this.loadingController.create({ message: 'Procesando...' });
      await loading.present();
        // MODO CREAR
        this.placeService.addPlace(this.form.value).subscribe({
          next: (res) => {
            loading.dismiss();
            alert('Lugar guardado con éxito');
            this.router.navigate(['/home']);
          },
          error: (err) => {
            loading.dismiss();
            console.error(err);
          }
        });
    }
  }

  ngOnInit() {}
}
