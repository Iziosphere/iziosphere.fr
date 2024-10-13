import {Component, OnInit} from '@angular/core';
import {HeroSectionComponent} from "../hero-section/hero-section.component";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    HeroSectionComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  {



}

