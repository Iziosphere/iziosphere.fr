import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { NewsService } from '../../service/news.service';
import { News } from '../../models/news.model';
import { ToastrService } from 'ngx-toastr';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.scss'
})
export class NewsDetailsComponent implements OnInit {

  news: News | null = null;
  currentUrl: string = window.location.href;
  slug: string | null = null;
  previousSlug: string | null = null;
  nextSlug: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      if (this.slug) {
        this.loadNews();
      }
    });
  }

  loadNews(): void {
    this.newsService.getNewsBySlug(this.slug).subscribe({
      next: (news) => {
        if (news && news.post) {
          this.news = news.post;
          this.previousSlug = news.previousSlug;
          this.nextSlug = news.nextSlug;
        } else {
          this.router.navigate(['/404']).then(() => this.toastr.error("News not found."));
        }
      },
      error: (err) => {
        this.router.navigate(['/404']).then(() => this.toastr.error(err.error.message));
      }
    });
  }
}
