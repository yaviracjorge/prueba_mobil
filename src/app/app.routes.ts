import { Routes } from '@angular/router';
import {CreateRoutePage} from "./pages/create-route/create-route.page";

export const routes: Routes = [
  {path:'',
    loadChildren:()=>import('./pages/routes').then(m=>m.routes)
  },
  {
    path:'auth',
    loadChildren:()=>import('./pages/auth/auth.routes').then(m=>m.routes)
  },
  {
    path:'show',
    component:CreateRoutePage
  },
  {
    path: 'show-place',
    loadComponent: () => import('./pages/show-place/show-place.page').then( m => m.ShowPlacePage)
  }
  /*{path:'',
  component:PruebaComponent},
  {
    path:'prueba',
    component:PruebaComponent
  },
  {
    path:'**',
    component:PruebaComponent
  }*/





];
