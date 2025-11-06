import { Routes } from "@angular/router";
import {authGuard} from "../guard/auth-guard";

export const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path: 'home',
    loadComponent:()=>import('./home/home.page').then( m => m.HomePage)
  },
  {
    path:'create-place',
    loadComponent:()=>import('./create-place/create-place.page').then( m => m.CreatePlacePage)
  },
  {
    path: 'create-route',
    loadComponent: () => import('./create-route/create-route.page').then( m => m.CreateRoutePage)
  }


];
