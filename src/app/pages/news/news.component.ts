import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import {Category, Post} from '../../models/news.model';
import { DatePipe, NgForOf, NgIf, SlicePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    NgIf,
    FormsModule,
    SlicePipe,
  ],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  listNews: Post[] = [];
  totalPages = 1;
  page = 1;
  limit = 5;
  categoryId: number | undefined;
  typeFilter= 'news'

  categories: Category[] = []

  constructor(private newsService: PostService, private router: Router) { }

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.newsService.getNews(this.page, this.limit,this.typeFilter,this.categoryId).subscribe({
      next: (news) => {
        this.listNews = news.data;
        const totalItems = news.totalItems;
        this.totalPages = Math.ceil(totalItems / this.limit);
        this.categories = news.categories;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
      this.loadNews();
    }
  }

  onLimitChange(): void {
    this.page = 1; // reset to first page
    this.loadNews();
  }

  onCategoryChange(): void {
    this.page = 1; // reset to first page
    this.loadNews();
  }

  viewDetails(slug: string): void {
    this.router.navigate([`news/${slug}`]);
  }
}
