import { inject } from '@angular/core';
import { Auth } from './../service/auth';
import { CanActivateFn, Router } from '@angular/router';

export const isAuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router)
  if (auth.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login'])
    return false;
  }
};
