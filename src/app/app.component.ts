import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {MistralService} from './service/mistral.service';
import {FormsModule} from '@angular/forms';
import {FooterHomeComponent} from './shared/footer/footer-home.component';
import {HeaderComponent} from './shared/header/header.component';
import {filter, map} from 'rxjs';
import {Meta, Title} from '@angular/platform-browser';
import {CookieConsentComponent} from './shared/cookie-consent/cookie-consent.component';
import {VisitorService} from './service/visitor.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, FooterHomeComponent,  HeaderComponent, CookieConsentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'iziosphere';
  userMessage: string = '';
  chatResponse: string | null = null;
  errorMessage: string | null = null;
  waitingForResponse = false;
  isAdminRoute = false;


  constructor(private mistralService: MistralService, private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title, private metaService: Meta, private visitorService: VisitorService) {
  }

  ngOnInit() {
    this.logVisit();
    this.setTitleOnPage();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        this.isAdminRoute = url.includes('/admin');
      }
    });
  }


  logVisit(): void {
    this.visitorService.logVisit().subscribe(() => {
    });
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
          this.metaService.updateTag({name: 'keywords', content: data['keywords'] || 'Keywords par défaut'});
          this.metaService.updateTag({name: 'theme-color', content: '#205292'});
          this.metaService.updateTag({name: 'robots', content: 'index, follow'});
          this.metaService.updateTag({name: 'description', content: data['description'] || 'Description par défaut'});
          this.metaService.updateTag({name: 'author', content: 'Iziosphere'});
          this.metaService.updateTag({property: 'og:type', content: 'website'});
          this.metaService.updateTag({property: 'og:site_name', content: 'Iziosphere'});
          this.metaService.updateTag({property: 'og:title', content: data['title']});
          this.metaService.updateTag({
            property: 'og:description',
            content: data['description'] || 'Description par défaut'
          });
          this.metaService.updateTag({property: 'og:image', content: 'https://iziosphere.fr/icon.svg'});
          this.metaService.updateTag({property: 'og:url', content: this.router.url});
          this.metaService.updateTag({
            name: 'twitter:description',
            content: data['description'] || 'Description par défaut'
          });
          this.metaService.updateTag({name: 'twitter:title', content: data['title']});
          this.metaService.updateTag({name: 'twitter:site', content: '@iziosphere'});
          this.metaService.updateTag({name: 'twitter:creator', content: '@iziosphere'});
          this.metaService.updateTag({name: 'twitter:card', content: 'summary'});
          this.metaService.updateTag({name: 'twitter:image', content: 'https://iziosphere.fr/icon.svg'});
          this.metaService.updateTag({name: 'twitter:image:alt', content: 'Iziosphere Logo'});
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
