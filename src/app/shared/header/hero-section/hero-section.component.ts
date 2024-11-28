import {Component} from '@angular/core';

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {
  categories = [
    {
      title: 'Création de Sites Web',
      icon: 'fa-laptop-code',
      link: '#'
    },
    {
      title: 'Optimisation & Référencement',
      icon: 'fa-chart-line',
      link: '#'
    },
    {
      title: 'Sécurité & Maintenance',
      icon: 'fa-shield-alt',
      link: '#'
    },
    {
      title: 'Développement & Intégrations',
      icon: 'fa-cogs',
      link: '#'
    },
    {
      title: 'Formation & Support',
      icon: 'fa-user-graduate',
      link: '#'
    },
    {
      title: 'Automatisation & IA',
      icon: 'fa-robot',
      link: '#'
    }
  ];


}
