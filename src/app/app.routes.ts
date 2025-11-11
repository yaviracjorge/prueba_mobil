import { Routes } from '@angular/router';
import {FormLoginComponent} from "./components/form-login/form-login.component";
import {PruebaComponent} from "./components/prueba/prueba.component";
import {HomePage} from "./pages/home/home.page";
import {MenuComponent} from "./layout/singIn/menu/menu.component";

export const routes: Routes = [
  {path:'',
    loadChildren:()=>import('./pages/routes').then(m=>m.routes)
  },
  {
    path:'auth',
    loadChildren:()=>import('./pages/auth/auth.routes').then(m=>m.routes)
  },
  {
    path: 'account',
    loadComponent: () => import('./pages/account/account.page').then( m => m.AccountPage)
  },
  /*{path:'',
  component:PruebaComponent},
  */{
    path:'prueba',
    component:PruebaComponent
  },
  {
    path:'**',
    component:PruebaComponent
  }





];
