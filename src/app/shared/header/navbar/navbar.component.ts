import {Component, OnInit} from '@angular/core';
import {HeroSectionComponent} from "../hero-section/hero-section.component";
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    HeroSectionComponent,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  {



}

