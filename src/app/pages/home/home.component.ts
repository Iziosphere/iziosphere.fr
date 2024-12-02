import {Component} from '@angular/core';
import {Section1HomeComponent} from "./section-1-home/section-1-home.component";
import {Section2HomeComponent} from "./section-2-home/section-2-home.component";
import {Section3HomeComponent} from "./section-3-home/section-3-home.component";
import {Section4HomeComponent} from "./section-4-home/section-4-home.component";
import {Section5HomeComponent} from "./section-5-home/section-5-home.component";
import {Section6HomeComponent} from "./section-6-home/section-6-home.component";

@Component({
  selector: 'app-home',
  imports: [
    Section1HomeComponent,
    Section2HomeComponent,
    Section3HomeComponent,
    Section4HomeComponent,
    Section5HomeComponent,
    Section6HomeComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
