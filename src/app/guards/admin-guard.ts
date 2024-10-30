import {CanActivateFn, Router} from '@angular/router';
import {inject, PLATFORM_ID} from "@angular/core";
import {AuthService} from '../service/auth.service';
import {ToastrService} from 'ngx-toastr';
import {isPlatformBrowser} from '@angular/common';
import {ERole} from '../models/user.model';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);
  const loggedIn = authService.isLoggedIn();
  const isAdmin = authService.hasRole(ERole.ROLE_ADMIN);

  if ((!loggedIn || !isAdmin) && isPlatformBrowser(platformId)) {
    inject(Router).navigate(['/login']);
    inject(ToastrService).error('You must be connected as an admin to access this page');
  }

  return loggedIn && isAdmin;
};
