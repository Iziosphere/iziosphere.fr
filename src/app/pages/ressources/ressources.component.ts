import { Component } from '@angular/core';
import {DatePipe, NgForOf, SlicePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Category, Post} from '../../models/news.model';
import {PostService} from '../../service/post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ressources',
    imports: [
        DatePipe,
        FormsModule,
        NgForOf,
        SlicePipe
    ],
  templateUrl: './ressources.component.html',
  styleUrl: './ressources.component.scss'
})
export class RessourcesComponent {
  listNews: Post[] = [];
  totalPages = 1;
  page = 1;
  limit = 5;
  categoryId: number | undefined;
  typeFilter = 'resource'

  categories: Category[] = []

  constructor(private newsService: PostService, private router: Router) {
  }

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.newsService.getNews(this.page, this.limit, this.typeFilter, this.categoryId).subscribe({
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
    this.router.navigate([`ressources/${slug}`]);
  }
}
