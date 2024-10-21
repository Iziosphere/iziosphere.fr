import { Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./shared/not-found/not-found.component";
import { LoginComponent } from './pages/login/login.component';
import { IplocationComponent } from './pages/tools/iplocation/iplocation.component';
import { TextEditorComponent } from './pages/tools/text-editor/text-editor.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [


  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Home'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
    // canActivate: [DisconnectedGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    // canActivate: [DisconnectedGuard]
  },
  {
    path: 'tools/ip-location',
    component: IplocationComponent,
    data: {
      title: 'Ip Location'
    }
  },
  {
    path: 'tools/text-editor',
    component: TextEditorComponent,
    data: {
      title: 'text editor'
    }
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      title: 'Not Found'
    }
  }
];
