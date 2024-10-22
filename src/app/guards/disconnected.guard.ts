import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from '../service/auth.service';

export const disconnectedGuard: CanActivateFn = (route, state) => {
  const loggedIn = inject(AuthService).isLoggedIn();
  if(loggedIn){
    inject(Router).navigate(['/home']);
    console.log("You are already connected");
  }
  return !loggedIn;
};
