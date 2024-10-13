import {Component, OnInit} from '@angular/core';
import {HeaderHomeComponent} from "../sub-header/header-home.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    HeaderHomeComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isOnHome: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.checkIfOnHomePage();
  }

  checkIfOnHomePage() {
    const currentRoute = this.router.url;

    if (currentRoute === '/') {
      console.log('You are on the home page');
      this.isOnHome = true;
    } else {
      console.log('You are not on the home page');
    }
  }

}

