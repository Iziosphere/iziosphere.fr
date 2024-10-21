import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../service/news.service';
import { News } from '../../models/news.model';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit {

  news: News | null = null;
  slug: string | null = null;

  constructor(private route: ActivatedRoute, private newsService: NewsService) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug');
    });
    this.newsService.getNewsBySlug(this.slug).subscribe(news => this.news = news);

  }

}
