import { Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { IplocationComponent } from './pages/tools/iplocation/iplocation.component';
import { TextEditorComponent } from './pages/tools/text-editor/text-editor.component';
import { RegisterComponent } from './pages/register/register.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NewsDetailsComponent } from './pages/news-details/news-details.component';
import { ServicesComponent } from './pages/services/services.component';
import { AboutComponent } from './pages/about/about.component';
import { NewsComponent } from './pages/news/news.component';
import { adminGuard } from './guards/admin-guard';
import { AdminCreatePostComponent } from './pages/admin/admin-create-posts/admin-create-post.component';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { AdminComponent } from './pages/admin/admin.component';
import {AdminPostsListComponent} from './pages/admin/admin-posts-list/admin-posts-list.component';
import {AdminDashboardComponent} from './pages/admin/admin-dashboard/admin-dashboard.component';
import {AdminRolesListComponent} from './pages/admin/admin-roles-list/admin-roles-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Home',
      description: 'Welcome to the home page',
      keywords: 'home, main, welcome'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login',
      description: 'Login page',
      keywords: 'login, connexion, authentification'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register',
      description: 'Register page',
      keywords: 'register, inscription, authenthification'
    }
  },
  {
    path: 'services',
    component: ServicesComponent,
    data: {
      title: 'Services',
      description: 'Services page',
      keywords: 'services, prestations, offres'
    }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      title: 'Contact',
      description: 'Contact us page',
      keywords: 'contact, support, help'
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'About',
      description: 'About us page',
      keywords: 'about, information, company'
    }
  },
  {
    path: 'news',
    component: NewsComponent,
    data: {
      title: 'News',
      description: 'Latest news and updates',
      keywords: 'news, updates, articles'
    }
  },
  {
    path: 'news/:slug',
    component: NewsDetailsComponent,
    data: {
      title: 'News Details',
      description: 'Detailed news article',
      keywords: 'news, details, article'
    }
  },
  {
    path: 'tools/ip-location',
    component: IplocationComponent,
    data: {
      title: 'IP Location',
      description: 'IP location tool',
      keywords: 'ip, location, tool'
    }
  },
  {
    path: 'tools/text-editor',
    component: TextEditorComponent,
    data: {
      title: 'Text Editor',
      description: 'Online text editor',
      keywords: 'text, editor, tool'
    }
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard],
    data: {
      title: 'Admin',
      description: 'Admin page',
      keywords: 'admin, dashboard, control'
    },
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'posts', component: AdminPostsListComponent },
      { path: 'posts/create', component: AdminCreatePostComponent },
      { path: 'roles', component: AdminRolesListComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // Redirection par défaut
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      title: 'Not Found',
      description: 'Page not found',
      keywords: '404, not found, error'
    }
  }
];
