import {Component, ElementRef, AfterViewInit, ViewChildren, QueryList, OnInit} from '@angular/core';

@Component({
  selector: 'app-section-3-home',
  templateUrl: './section-3-home.component.html',
  standalone: true,
  styleUrls: ['./section-3-home.component.scss']
})
export class Section3HomeComponent implements OnInit{
  stats = [
    {
      icon: 'fas fa-laptop-code',
      value: 120,
      description: 'Projets Web réalisés',
    },
    {
      icon: 'fas fa-users',
      value: 98,
      description: 'Satisfaction client',
    },
    {
      icon: 'fas fa-clock',
      value: 3,
      description: 'Durée moyenne de développement',
    },
    {
      icon: 'fas fa-globe',
      value: 15,
      description: 'Pays couverts',
    }
  ];

  @ViewChildren('counter') counters!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startCounting(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    this.counters.forEach(counter => {
      observer.observe(counter.nativeElement);
    });
  }

  startCounting(element: any) {
    const duration = 2000;
    const target = +element.getAttribute('data-target');
    const incrementTime = duration / target;

    let currentValue = 0;

    const updateCounter = () => {
      if (currentValue < target) {
        element.innerText = ++currentValue;
        setTimeout(updateCounter, incrementTime);
      } else {
        element.innerText = target.toString();
      }
    };

    updateCounter();
  }

  ngOnInit(): void {
  }
}
