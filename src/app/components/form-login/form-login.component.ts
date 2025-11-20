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
import {BiometricService} from "../../services/biometric.service";


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
    ReactiveFormsModule,
    IonIcon,
  ]
})
export class FormLoginComponent  implements OnInit {
  formBuilder = inject(FormBuilder);
  router = inject(Router)
  authService = inject(AuthServices)
  biometricService = inject(BiometricService)

  formLogin = this.formBuilder.group({
    username: ['', [Validators.required,]],
    password: ['', [Validators.required]]
  });

  onSubmit() {
    const data = this.formLogin.value;
    if (this.formLogin.valid) {
      this.authService.login(data).subscribe(async (authResponse: any) => {
        localStorage.setItem('token', authResponse.token);
        localStorage.setItem('rol', authResponse.role);

        const bioStatus = await this.biometricService.isAvailable();
        if (bioStatus.isAvailable) {
          await this.biometricService.saveTokenSecure(authResponse.token, authResponse.role);
        }
        this.router.navigate(['home']);
      }, (error) => {
        console.log(error);
      })
    }
  }

  async loginWithFingerprint(){
    const sessionData = await this.biometricService.getTokenSecure();
    if (sessionData) {
      // Restaurar sesión en la app
      localStorage.setItem('token', sessionData.token);
      localStorage.setItem('rol', sessionData.role);

      // Navegar
      this.router.navigate(['home']);
    }
  }



  constructor() { }

  ngOnInit() {}

}
