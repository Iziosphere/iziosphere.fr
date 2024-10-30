import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {HeroSectionComponent} from "../hero-section/hero-section.component";
import {Router, RouterLink} from "@angular/router";
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

  public isLogged = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.authService.authStateChanged.subscribe((logged: boolean) => {
      this.isLogged = this.authService.isLoggedIn();
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }


}

