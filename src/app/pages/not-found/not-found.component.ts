import { Component } from '@angular/core';
import {FooterHomeComponent} from "../home/footer/footer-home.component";
import {NavbarComponent} from "../home/navbar/navbar.component";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    FooterHomeComponent,
    NavbarComponent
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
