import { Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./shared/not-found/not-found.component";
import { LoginComponent } from './pages/login/login.component';
import { IplocationComponent } from './pages/tools/iplocation/iplocation.component';
import { TextEditorComponent } from './pages/tools/text-editor/text-editor.component';
import { RegisterComponent } from './pages/register/register.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NewsComponent } from './pages/news/news.component';
import { ServicesComponent } from './pages/services/services.component';
import { AboutComponent } from './pages/about/about.component';

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
    path: 'services',
    component: ServicesComponent,
    data: {
      title: 'Services'
    }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      title: 'Contact'
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'About'
    }
  },
  {
    path: 'news/:slug',
    component: NewsComponent,
    data: {
      title: 'News'
    }
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
    path: 'contact',
    component: ContactComponent,
    data: {
      title: 'Contact'
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
