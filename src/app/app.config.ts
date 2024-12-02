import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withInMemoryScrolling, withRouterConfig} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {provideToastr} from 'ngx-toastr';
import {provideAnimations} from '@angular/platform-browser/animations';
import {authInterceptor} from './interceptors/auth-interceptor';
import { provideClientHydration } from '@angular/platform-browser';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes, withInMemoryScrolling({
    scrollPositionRestoration: 'top',
    anchorScrolling: 'disabled'
  }), withRouterConfig({
    paramsInheritanceStrategy: 'always',
    onSameUrlNavigation: 'reload'
  }),), provideHttpClient(withInterceptors([authInterceptor]),withFetch()),
    provideAnimations(),
    // required animations providers
    provideToastr({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), provideClientHydration(),
  ]
};
