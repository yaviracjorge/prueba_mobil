import {Component, inject, OnInit} from '@angular/core';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput, IonInputPasswordToggle,
  IonItem,
  IonLabel,
  IonList, IonNote,
  IonRow,

} from "@ionic/angular/standalone";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  emailDomainValidator,
  emailUserValidator,
  EqualPasswordValidator, numberValidator,
  SearchValidator, spaceValidator
} from "../../util/customValidator";

@Component({
    selector: 'app-form-register',
    templateUrl: './form-register.component.html',
    styleUrls: ['./form-register.component.scss'],
  imports: [
    IonButton,
    IonCol,
    IonGrid,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonRow,
    ReactiveFormsModule,
    IonInputPasswordToggle,
    IonNote,

  ]
})
export class FormRegisterComponent  implements OnInit {
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    email: ['',[Validators.required,emailDomainValidator,emailUserValidator,Validators.email]],
    username: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(15),spaceValidator()]],
    password: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(15),SearchValidator,spaceValidator(),numberValidator()]],
    confirmPassword: ['',[Validators.required]],
  },
    {
      validators:[EqualPasswordValidator('password','confirmPassword')]
    })
  get email() { return this.form.controls['email']; }
  get username() { return this.form.controls['username']; }
  get password() { return this.form.controls['password']; }
  get confirmPassword() { return this.form.controls['confirmPassword']; }

  constructor() { }

  ngOnInit() {}

}
