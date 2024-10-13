import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as AOS from 'aos';
import {NgForOf} from '@angular/common';
@Component({
  selector: 'app-header-home',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.scss',

})
export class HeaderHomeComponent {
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
