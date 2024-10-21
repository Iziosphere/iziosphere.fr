import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews() : Observable<News[]> {
    return this.http.get<News[]>('http://iziosphere.fr:60000/news');
  }

  getNewsBySlug(slug: string | null) : Observable<News> {
    return this.http.get<News>(`http://iziosphere.fr:60000/news/${slug}`);
  }
    

}

