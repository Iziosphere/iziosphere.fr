import {Component, OnInit} from '@angular/core';
import {HeroSectionComponent} from "../hero-section/hero-section.component";
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from "@angular/router";
import {AuthService} from '../../../service/auth.service';

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
export class NavbarComponent implements OnInit {

  isLogged: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.authStateChanged.subscribe((logged: boolean) => {
      this.isLogged = logged;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }


}

