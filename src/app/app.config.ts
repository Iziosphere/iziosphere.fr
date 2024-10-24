import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withInMemoryScrolling, withRouterConfig} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideToastr} from 'ngx-toastr';
import {provideAnimations} from '@angular/platform-browser/animations';
import {authInterceptor} from './interceptors/auth-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes, withInMemoryScrolling({
    scrollPositionRestoration: 'top',
    anchorScrolling: 'disabled'
  }), withRouterConfig({
    paramsInheritanceStrategy: 'always',
    onSameUrlNavigation: 'reload'
  }),), provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    // required animations providers
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ]
};
