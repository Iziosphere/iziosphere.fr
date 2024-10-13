import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {initFlowbite} from 'flowbite';
import {MistralService} from './service/mistral.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {HeaderHomeComponent} from './pages/home/header-home/header-home.component';
import {Section1HomeComponent} from './pages/home/section-1-home/section-1-home.component';
import {Section2HomeComponent} from './pages/home/section-2-home/section-2-home.component';
import {Section3HomeComponent} from './pages/home/section-3-home/section-3-home.component';
import {Section4HomeComponent} from './pages/home/section-4-home/section-4-home.component';
import {Section5HomeComponent} from './pages/home/section-5-home/section-5-home.component';
import {Section6HomeComponent} from './pages/home/section-6-home/section-6-home.component';
import {Section7HomeComponent} from './pages/home/section-7-home/section-7-home.component';
import {FooterHomeComponent} from './pages/home/footer-home/footer-home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf, HeaderHomeComponent, Section1HomeComponent, Section2HomeComponent, Section3HomeComponent, Section4HomeComponent, Section5HomeComponent, Section6HomeComponent, Section7HomeComponent, FooterHomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'iziosphere';
  userMessage: string = '';
  chatResponse: string | null = null;
  errorMessage: string | null = null;
  waitingForResponse = false;


  constructor(private mistralService: MistralService) {
  }

  ngOnInit() {
    initFlowbite();
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
