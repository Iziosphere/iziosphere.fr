import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { MistralService } from './service/mistral.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HeroSectionComponent } from './shared/header/hero-section/hero-section.component';
import { Section1HomeComponent } from './pages/home/section-1-home/section-1-home.component';
import { Section2HomeComponent } from './pages/home/section-2-home/section-2-home.component';
import { Section3HomeComponent } from './pages/home/section-3-home/section-3-home.component';
import { Section4HomeComponent } from './pages/home/section-4-home/section-4-home.component';
import { Section5HomeComponent } from './pages/home/section-5-home/section-5-home.component';
import { Section6HomeComponent } from './pages/home/section-6-home/section-6-home.component';
import { FooterHomeComponent } from './shared/footer/footer-home.component';
import { NotFoundComponent } from "./shared/not-found/not-found.component";
import { NavbarComponent } from "./shared/header/navbar/navbar.component";
import { HeaderComponent } from './shared/header/header.component';
import { filter, map } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { CookieConsentComponent } from './shared/cookie-consent/cookie-consent.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf, HeroSectionComponent, Section1HomeComponent, Section2HomeComponent, Section3HomeComponent, Section4HomeComponent, Section5HomeComponent, Section6HomeComponent, FooterHomeComponent, NotFoundComponent, NavbarComponent, HeaderComponent, CookieConsentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'iziosphere';
  userMessage: string = '';
  chatResponse: string | null = null;
  errorMessage: string | null = null;
  waitingForResponse = false;


  constructor(private mistralService: MistralService, private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {
  }

  ngOnInit() {
    this.setTitleOnPage();
  }

  setTitleOnPage() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute.firstChild;
          while (route?.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        map(route => route?.snapshot.data)
      )
      .subscribe(data => {
        if (data) {
          this.titleService.setTitle("Iziosphere - " + data['title'] || 'Iziosphere');
        }
      });
  }

  sendMessage() {
    if (!this.userMessage.trim()) {
      return;
    }
    this.chatResponse = null;
    this.waitingForResponse = true;
    this.mistralService.getChatResponse(this.userMessage).subscribe({
      next: (response) => {
        this.chatResponse = response.choices[0].message.content;
        this.errorMessage = null;
        this.waitingForResponse = false

      },
      error: (error) => {
        this.errorMessage = 'Une erreur est survenue. Veuillez réessayer. ' + error.message;
        this.chatResponse = null;
        this.waitingForResponse = false;
      }
    });

  }
}
