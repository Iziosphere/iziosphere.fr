import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

export interface Breadcrumb {
  name: string;
  link: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.updateBreadcrumbs();

    this.router.events
      .subscribe(() => {
        this.updateBreadcrumbs();
      });
  }

  private updateBreadcrumbs() {
    const url = this.router.url;

    if (!this.routeExists(url)) {
      this.breadcrumbs = [
        {name: 'Home', link: '/'},
        {name: '404 Page Not Found', link: url}
      ];
      return;
    }

    const urlSegments = url.split('/').filter(segment => segment);
    console.log("segment" + urlSegments);

    this.breadcrumbs = [{name: 'Home', link: '/'}];

    let accumulatedLink = '';

    for (const segment of urlSegments) {
      accumulatedLink += '/' + segment;
      const name = segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
      this.breadcrumbs.push({name, link: accumulatedLink});
    }
  }


  private routeExists(url: string): boolean {
    return this.router.config.some(config => {
      const path = config.path?.split('/').filter(segment => segment);
      const urlSegments = url.split('/').filter(segment => segment);
      return JSON.stringify(path) === JSON.stringify(urlSegments);
    });
  }


}
