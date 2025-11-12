import {Component, inject, OnInit} from '@angular/core';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow
} from "@ionic/angular/standalone";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthServices} from "../../services/auth.services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
  imports: [
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonCol,
    IonRow,
    IonGrid,
    ReactiveFormsModule,
  ]
})
export class FormLoginComponent  implements OnInit {
  formBuilder = inject(FormBuilder);
  router = inject(Router)
  authService = inject(AuthServices)

  formLogin = this.formBuilder.group({
    username: ['', [Validators.required,]],
    password: ['', [Validators.required]]
  });

  onSubmit() {
   const data = this.formLogin.value;
   if(this.formLogin.valid){
     this.authService.login(data).subscribe((authRespone:any)=>{
       sessionStorage.setItem('token',authRespone.token);
        this.router.navigate(['home']);
     },(error)=>{
       console.log(error);
     })
   }

  }



  constructor() { }

  ngOnInit() {}

}
