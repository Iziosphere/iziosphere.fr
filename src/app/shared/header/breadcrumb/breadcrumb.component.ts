import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';  // Import manquant

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

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event instanceof NavigationEnd) {
          const url = event.url;
          const urlSegments = url.split('/').filter(segment => segment);

          // Reset breadcrumbs
          this.breadcrumbs = [];

          for (let index = 0; index < urlSegments.length; index++) {
            const segment = urlSegments[index];
            const link = '/' + urlSegments.slice(0, index + 1).join('/');

            // Check if the route exists in the router configuration
            if (this.routeExists(link)) {
              const name = segment.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
              this.breadcrumbs.push({
                name,
                link
              });
            } else {
              // If a 404 is encountered, stop further processing
              this.breadcrumbs.push({
                name: '404 Page Not Found',
                link: '/404'
              });
              break; // Stop the loop once we detect a 404
            }
          }

          console.log(this.breadcrumbs);
        }
      });
  }

  // Method to check if a route exists in the router configuration
  routeExists(path: string): boolean {
    return this.router.config.some(route => {
      const routePath = '/' + (route.path || '');
      return routePath === path;
    });
  }
}
