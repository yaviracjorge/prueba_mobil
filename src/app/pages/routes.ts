import { Routes } from "@angular/router";
import {authGuard} from "../guard/auth-guard";
import {MenuComponent} from "../layout/menu/menu.component";

export const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent:()=>import('./home/home.page').then( m => m.HomePage)
      },
      {
        path:'create-place',
        canActivate:[authGuard],
        loadComponent:()=>import('./create-place/create-place.page').then( m => m.CreatePlacePage)
      },
      {
        path:'account',
        canActivate:[authGuard],
        loadComponent:()=>import('./account/account.page').then( m => m.AccountPage)
      },
      {
        path:'show-place',
        canActivate:[authGuard],
        loadComponent:()=>import('./show-place/show-place.page').then( m => m.ShowPlacePage)
      },
      {
        path: 'create-route',
        loadComponent: () => import('./create-route/create-route.page').then( m => m.CreateRoutePage)
      }
    ]
  }


];
