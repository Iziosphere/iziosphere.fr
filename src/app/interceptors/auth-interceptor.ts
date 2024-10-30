import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject, PLATFORM_ID} from "@angular/core";
import {catchError, throwError} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from '../service/auth.service';
import {ToastrService} from 'ngx-toastr';
import {isPlatformBrowser} from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const jwtToken = authService.getCurrentToken();
  const platformId = inject(PLATFORM_ID);

  // Only inject Router and ToastrService if running in the browser
  const router = isPlatformBrowser(platformId) ? inject(Router) : null;
  const toastr = isPlatformBrowser(platformId) ? inject(ToastrService) : null;

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

        if (isPlatformBrowser(platformId) && router && toastr) {
          router.navigate(['/login']).then(() => toastr.error("You are not authenticated"));
        }
      }
      if (error.status === 403) {
        if (isPlatformBrowser(platformId) && router && toastr) {
          router.navigate(['/login']).then(() => toastr.error("You are not authorized"));
        }
      }
      return throwError(() => error);
    })
  );
};
