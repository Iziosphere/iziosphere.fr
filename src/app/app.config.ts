import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideToastr} from 'ngx-toastr';
import {provideAnimations} from '@angular/platform-browser/animations';
import {authInterceptor} from './interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideHttpClient(withInterceptors([authInterceptor])), provideAnimations(), // required animations providers
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),]
};
