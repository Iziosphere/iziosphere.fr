import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../service/news.service';
import { News } from '../../models/news.model';
import {DatePipe, NgForOf, NgIf, SlicePipe} from '@angular/common';
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
  listNews: News[] = [];
  totalPages = 1;
  page = 1;
  limit = 5;
  categoryId: number | undefined;
  categories = [
    { id: 1, name: 'Web Development' },
    { id: 2, name: 'Mobile Applications' },
    { id: 3, name: 'SEO Optimization' },
    { id: 4, name: 'Digital Marketing' },
    { id: 5, name: 'Cloud Computing' },
    { id: 6, name: 'Data Science' },
    { id: 7, name: 'Cybersecurity' }
  ];

  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.newsService.getNews(this.page, this.limit, this.categoryId).subscribe({
      next: (news) => {
        this.listNews = news.data;
        const totalItems = news.totalItems;
        this.totalPages = Math.ceil(totalItems / this.limit);
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
