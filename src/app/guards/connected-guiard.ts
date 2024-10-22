import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from '../service/auth.service';

export const connectedGuard: CanActivateFn = (route, state) => {
  const loggedIn = inject(AuthService).isLoggedIn();
  if(!loggedIn){
    inject(Router).navigate(['/login']);
    console.log("You are not connected");
  }
  return loggedIn;
};
