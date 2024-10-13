import {Component, OnInit} from '@angular/core';
import {HeroSectionComponent} from "./hero-section/hero-section.component";
import {NavigationEnd, Router} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    HeroSectionComponent,
    NavbarComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isHomeRoute: boolean = false;


  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHomeRoute = event.url === '/home' || event.url === '/';
      }
    });
  }
}
