import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const rol = localStorage.getItem("rol")

  if (rol !== "USER") {
    return router.createUrlTree(['/auth/login']);
  }
  return true;
};
