import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

// PUBLIC_INTERFACE
export const authGuard: CanActivateFn = () => {
  /** Guards routes requiring authentication. Redirects to /login if not authenticated. */
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.getToken()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
