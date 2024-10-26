import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

export const connectedGuard: CanActivateFn = (route, state) => {
  const loggedIn = inject(AuthService).isLoggedIn();
  if(!loggedIn){
    inject(Router).navigate(['/login']);
    inject(ToastrService).error('You must be connected to access this page');
  }
  return loggedIn;
};
