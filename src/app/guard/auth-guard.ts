import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const rol = localStorage.getItem("rol")

  if (rol !== "USER") {
    // ✅ CAMBIO: Devolvemos el UrlTree directamente.
    // Esto cancela la ruta actual y redirige inmediatamente sin "rebotes".
    return router.createUrlTree(['/auth/login']);
  }
  return true;
};
