import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../service/news.service';
import { News } from '../../models/news.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.scss'
})
export class NewsDetailsComponent implements OnInit {

  news!: News;
  currentUrl: string = window.location.href;
  slug: string | null = null;

  constructor(private route: ActivatedRoute, private newsService: NewsService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug');
    });
    this.newsService.getNewsBySlug(this.slug).subscribe({
      next: (news) => {
        this.news = news;
      },
      error: (err) => {
        this.router.navigate(['/404']).then(() => this.toastr.error(err.error.message));
      }

    });

  }

}
