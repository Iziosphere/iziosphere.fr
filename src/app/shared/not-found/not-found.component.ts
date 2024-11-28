import { Component } from '@angular/core';
import {FooterHomeComponent} from "../footer/footer-home.component";
import {NavbarComponent} from "../header/navbar/navbar.component";
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-not-found',
    imports: [
        FooterHomeComponent,
        NavbarComponent,
        RouterLink
    ],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
