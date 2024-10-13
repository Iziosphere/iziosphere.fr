import { Component } from '@angular/core';
import {FooterHomeComponent} from "./footer/footer-home.component";
import {HeaderHomeComponent} from "./sub-header/header-home.component";
import {Section1HomeComponent} from "./section-1-home/section-1-home.component";
import {Section2HomeComponent} from "./section-2-home/section-2-home.component";
import {Section3HomeComponent} from "./section-3-home/section-3-home.component";
import {Section4HomeComponent} from "./section-4-home/section-4-home.component";
import {Section5HomeComponent} from "./section-5-home/section-5-home.component";
import {Section6HomeComponent} from "./section-6-home/section-6-home.component";
import {Section7HomeComponent} from "./section-7-home/section-7-home.component";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        FooterHomeComponent,
        HeaderHomeComponent,
        Section1HomeComponent,
        Section2HomeComponent,
        Section3HomeComponent,
        Section4HomeComponent,
        Section5HomeComponent,
        Section6HomeComponent,
        Section7HomeComponent
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
