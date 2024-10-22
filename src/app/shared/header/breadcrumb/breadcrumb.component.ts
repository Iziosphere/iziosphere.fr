import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, ActivatedRoute, NavigationEnd} from '@angular/router';
import {CommonModule} from '@angular/common';
import {filter} from 'rxjs/operators';

export interface Breadcrumb {
  name: string;
  link: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.updateBreadcrumbs();

    // Subscribe to router events and update breadcrumbs on every navigation end
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
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

    this.breadcrumbs = [{name: 'Home', link: '/'}];

    let accumulatedLink = '';

    for (const segment of urlSegments) {
      accumulatedLink += '/' + segment;

      // Get the name of the segment, or handle dynamic routes
      const routeConfig = this.getRouteConfig(accumulatedLink);

      let name;
      if (routeConfig && routeConfig.path?.includes(':')) {
        // Handle dynamic route segments (e.g., :slug)
        const paramKey = routeConfig.path.match(/:(\w+)/)?.[1];
        name = this.route.snapshot.paramMap.get(paramKey!);
      } else {
        name = segment

      }
      this.breadcrumbs.push({name: name || segment, link: accumulatedLink});
    }
  }

  private routeExists(url: string): boolean {
    const matchingRoute = this.getRouteConfig(url);
    return !!matchingRoute;
  }

  private getRouteConfig(url: string) {
    return this.router.config.find(config => {
      const path = config.path?.split('/').filter(segment => segment);
      const urlSegments = url.split('/').filter(segment => segment);

      return this.compareRoutes(path!, urlSegments);
    });
  }

  private compareRoutes(routePath: string[], urlSegments: string[]): boolean {
    if (routePath.length !== urlSegments.length) {
      return false;
    }

    for (let i = 0; i < routePath.length; i++) {
      if (routePath[i].startsWith(':')) {
        continue;
      }
      if (routePath[i] !== urlSegments[i]) {
        return false;
      }
    }

    return true;
  }

  formatBreadcrumbName(name: string | undefined): string {
    if (!name) return '';
    return name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }
}
