import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as AOS from 'aos';
import {NgForOf} from '@angular/common';
import {NavbarComponent} from "../navbar/navbar.component";
@Component({
  selector: 'app-hero-section',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',

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
