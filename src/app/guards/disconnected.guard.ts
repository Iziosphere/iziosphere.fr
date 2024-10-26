import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

export const disconnectedGuard: CanActivateFn = (route, state) => {
  const loggedIn = inject(AuthService).isLoggedIn();
  if(loggedIn){
    inject(Router).navigate(['/home']);
    inject(ToastrService).error('You are already connected');
  }
  return !loggedIn;
};
