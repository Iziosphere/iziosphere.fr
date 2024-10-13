import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MistralService {
  private apiUrl = 'https://api.mistral.ai/v1/chat/completions';
  private apiKey = 'zedE7B1YFKjPxEqlTxMzAn0K77bcAGd1'; // Remplacez par votre clé d'API

  constructor(private http: HttpClient) {
  }

  getChatResponse(message: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    });

    const body = {
      model: 'open-mixtral-8x22b',
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    };

    return this.http.post(this.apiUrl, body, {headers});
  }
}
