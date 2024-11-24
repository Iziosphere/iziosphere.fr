import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News, NewsBySlug, NewsFiltered } from '../models/news.model';
import { API_URL } from './config';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = API_URL + '/posts';
  constructor(private http: HttpClient) { }

  getNews(page: number = 1, limit: number = 3, type: string, categoryId?: number): Observable<NewsFiltered> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('type', type.toString());

    if (categoryId !== undefined) {
      params = params.set('categoryId', categoryId.toString());
    }

    return this.http.get<NewsFiltered>(this.apiUrl+"/all", { params });
  }

  getNewsBySlug(slug: string | null): Observable<NewsBySlug> {
    return this.http.get<NewsBySlug>(`${this.apiUrl}/slug/${slug}`);
  }

}

