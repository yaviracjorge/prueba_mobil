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
  authService = inject(AuthServices);

  formLogin = this.formBuilder.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required]]
  });

  onSubmit() {
    let email = this.formLogin.get('correo')?.value;
    let password = this.formLogin.get('contrasena')?.value;
    if(email && password){
      if(email === 'a'){
        sessionStorage.setItem("rol", "ADMIN");
        this.router.navigate(['/create-place'])
      }
    }
  }



  constructor() { }

  ngOnInit() {}

}
