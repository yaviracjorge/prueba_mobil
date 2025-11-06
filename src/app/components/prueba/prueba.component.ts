import {Component, inject, OnInit} from '@angular/core';
import {IonButton, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonList, IonRow} from "@ionic/angular/standalone";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthServices} from "../../services/auth.services";
import {JsonPipe} from "@angular/common";

@Component({
    selector: 'app-prueba',
    templateUrl: './prueba.component.html',
    styleUrls: ['./prueba.component.scss'],
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
    JsonPipe
  ]
})
export class PruebaComponent  implements OnInit {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthServices);
  users= []
  formLogin = this.formBuilder.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required]]
  });
  //private apiUrl = 'http://localhost:8080/usuarios';
  //http = inject(HttpClient)
 /* findAll(){
    this.http.get(`${this.apiUrl}/usuarios`).subscribe(res=>{
      console.log(res);
    })

  }*/
  constructor() { }

  ngOnInit() {
    this.authService.findAll().subscribe({
      next: data => {
        this.users = data;
        console.log("Datos recibidos:", this.users);
      }
    })

  }

}
