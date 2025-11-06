import {Component, inject, OnInit} from '@angular/core';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonList, IonNote,
  IonRow,
  IonTextarea
} from "@ionic/angular/standalone";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {hasNumberValidator, numberValidator, spaceValidator} from "../../util/customValidator";

@Component({
    selector: 'app-form-data',
    templateUrl: './form-data.component.html',
    styleUrls: ['./form-data.component.scss'],
  imports: [
    IonButton,
    IonCol,
    IonGrid,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonRow,
    IonTextarea,
    ReactiveFormsModule,
    IonNote
  ]
})
export class FormDataComponent  implements OnInit {
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group
  ({
    name:['',[Validators.required,Validators.maxLength(20)]],
    description:['',[Validators.required,Validators.maxLength(200)]],
    provincia:['',[Validators.required,spaceValidator(),hasNumberValidator(),Validators.maxLength(10)]],
    city:['',[Validators.required,spaceValidator(),numberValidator(),Validators.maxLength(10)]],
    typePlace:['',[Validators.required,spaceValidator(),numberValidator(),Validators.maxLength(10)]],
    caracteristics:['',[Validators.required,Validators.maxLength(200)]],
    schedules:[''],
    price:['',[Validators.required,Validators.min(0),Validators.max(1000)]],
  })

  get name() { return this.form.controls['name']; }
  get description() { return this.form.controls['description']; }
  get provincia() { return this.form.controls['provincia']; }
  get city() { return this.form.controls['city']; }
  get typePlace() { return this.form.controls['typePlace']; }
  get caracteristics() { return this.form.controls['caracteristics']; }
  get schedules() { return this.form.controls['schedules']; }
  get price() { return this.form.controls['price']; }

  constructor() { }

  ngOnInit() {}

}
