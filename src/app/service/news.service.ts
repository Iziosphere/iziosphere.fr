import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../models/news.model';
import {API_URL} from './config';

@Injectable({
	providedIn: 'root'
})
export class NewsService {

  private apiUrl = API_URL + '/posts';
	constructor(private http: HttpClient) { }

	getNews(): Observable<News[]> {
		return this.http.get<News[]>(API_URL);
	}

	getNewsBySlug(slug: string | null): Observable<News> {
		return this.http.get<News>(`${API_URL}/${slug}`);
	}

}

