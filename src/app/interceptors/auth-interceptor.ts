import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {catchError, throwError} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from '../service/auth.service';
import {ToastrService} from 'ngx-toastr';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const jwtToken = authService.getCurrentToken();
  const router = inject(Router);
  const toastr = inject(ToastrService);
  if (jwtToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken.token}`
      }
    });
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']).then(() =>toastr.error("You are not authenticated"));
      }
      if (error.status === 403) {
        router.navigate(['/login']).then(() => toastr.error("You are not authorized"));
      }
      return throwError(() => error)
    })
  );
};
