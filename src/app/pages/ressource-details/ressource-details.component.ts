import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {Post} from '../../models/news.model';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {PostService} from '../../service/post.service';
import {ToastrService} from 'ngx-toastr';
import {Meta, Title} from '@angular/platform-browser';
import {DatePipe, isPlatformBrowser, NgIf} from '@angular/common';

@Component({
  selector: 'app-ressource-details',
  imports: [
    DatePipe,
    NgIf,
    RouterLink
  ],
  templateUrl: './ressource-details.component.html',
  styleUrl: './ressource-details.component.scss'
})
export class RessourceDetailsComponent {
  news: Post | null = null;
  currentUrl: string = '';
  slug: string | null = null;
  previousSlug: string | null = null;
  nextSlug: string | null = null;
  previousTitle: string | null = null;
  nextTitle: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private newsService: PostService,
    private toastr: ToastrService,
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

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
          this.previousTitle = news.previousTitle;
          this.nextTitle = news.nextTitle;
          this.currentUrl = this.router.url;
          // Mise à jour des balises meta et du titre

          this.setMetaTags(this.news);


        } else {
          if (isPlatformBrowser(this.platformId)) {
            this.router.navigate(['/404']).then(() => this.toastr.error("News not found"));
          }
        }
      },
      error: (err) => {
        if (isPlatformBrowser(this.platformId) && err.status === 404) {
          this.router.navigate(['/404']).then(() => this.toastr.error(err.error.message));
        }
      }
    });
  }

  setMetaTags(news: Post) {
    if (!news) return;
    this.titleService.setTitle(news.title);
    this.metaService.updateTag({name: 'description', content: news.content.slice(0, 100)});
    this.metaService.updateTag({property: 'og:title', content: news.title});
    this.metaService.updateTag({property: 'og:type', content: 'article'});
    this.metaService.updateTag({property: 'og:url', content: this.router.url});
    this.metaService.updateTag({property: 'og:image', content: news.image});
    this.metaService.updateTag({property: 'og:description', content: news.content.slice(0, 100)});
    this.metaService.updateTag({property: 'article:published_time', content: news.publishedAt.toString()});
    this.metaService.updateTag({property: 'article:modified_time', content: news.updatedAt.toString()});
    this.metaService.updateTag({property: 'article:author', content: news.author});
    this.metaService.updateTag({property: 'article:section', content: news.category.name});
    // todo this.metaService.updateTag({ property: 'article:tag', content: news.category.name });
    this.metaService.updateTag({name: 'twitter:card', content: 'summary_large_image'});
    this.metaService.updateTag({name: 'twitter:title', content: news.title});
    this.metaService.updateTag({name: 'twitter:description', content: news.content.slice(0, 100)});
    this.metaService.updateTag({name: 'twitter:image', content: news.image});
  }
}

