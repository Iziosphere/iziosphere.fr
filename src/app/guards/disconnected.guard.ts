import {CanActivateFn, Router} from '@angular/router';
import {inject, PLATFORM_ID} from "@angular/core";
import {AuthService} from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

export const disconnectedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);
  const loggedIn = authService.isLoggedIn();

  if (loggedIn && isPlatformBrowser(platformId)) {
    inject(Router).navigate(['/home']);
    inject(ToastrService).error('You are already connected');
  }

  return !loggedIn;
};
