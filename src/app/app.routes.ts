import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {NotFoundComponent} from "./shared/not-found/not-found.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },

    {
        path: 'home',
        component: HomeComponent
    },
    // {
    //     path: 'login',
    //     component: LoginComponent,
    //     canActivate: [DisconnectedGuard]
    // },
    // {
    //     path: 'register',
    //     component: RegisterComponent,
    //     canActivate: [DisconnectedGuard]
    // },
    {
        path: '**',
        component: NotFoundComponent
    }
];
