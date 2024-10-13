import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {initFlowbite} from 'flowbite';
import {MistralService} from './service/mistral.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf],
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
