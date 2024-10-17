import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [NgIf],
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss']
})
export class CookieConsentComponent {
  showBanner = false;

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    this.showBanner = !this.cookieService.check('user-consent');
  }

  acceptCookies() {
    this.cookieService.set('user-consent', 'accepted', 365);
    this.showBanner = false;
  }

  rejectCookies() {
    this.cookieService.set('user-consent', 'rejected', 365);
    this.showBanner = false;
  }
}
