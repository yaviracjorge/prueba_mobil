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
import {AuthServices} from "../../services/auth.services";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";

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
  authService = inject(AuthServices);
  router = inject(Router);


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

   onSubmit(){
     const data = this.form.value;
    if(this.form.valid){

      this.authService.register(data).subscribe(()=>{
        this.router.navigate(['login']);
      },
        (error)=>{
        console.log(error);
        })
    }

  }

  constructor() { }

  ngOnInit() {}

}
