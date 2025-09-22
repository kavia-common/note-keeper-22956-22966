import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

// PUBLIC_INTERFACE
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  /** Intercepts outgoing HTTP requests and attaches Authorization header if token is present. */
  const auth = inject(AuthService);
  const token = auth.getToken();

  if (token && !req.headers.has('Authorization')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
