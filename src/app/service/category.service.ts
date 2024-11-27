import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Post, NewsBySlug, NewsFiltered, PostCreateDto, Category} from '../models/news.model';
import { API_URL } from './config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = API_URL + '/category';
  constructor(private http: HttpClient) { }


  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl+"/all");
  }

}

