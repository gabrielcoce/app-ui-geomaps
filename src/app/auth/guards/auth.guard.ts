import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authSvc = inject(AuthService);
  const router = inject(Router);
  if (!authSvc.isAuthenticated()) {
    authSvc.redirectUrl = router.url;
    return router.navigate(['login']);
  }
  return true;
};

export const loginGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const redirectUrl = authService.redirectUrl || '/maps';
    authService.redirectUrl = null; // Limpiar la URL guardada
    return router.navigate([redirectUrl]);
  }
  return true;
};
