import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const rol = sessionStorage.getItem("rol")
  
  if(rol !== "ADMIN"){
    return router.navigate(['/auth/login']);
  }
  return true;
};
