import {Component, OnInit} from '@angular/core';
import {NewsService} from '../../../service/news.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-section-4-home',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './section-4-home.component.html',
  styleUrl: './section-4-home.component.scss'
})
export class Section4HomeComponent{
  news = [
    {
      title: 'Liste des célébrations du week-end de la ville',
      category: 'Gouvernement',
      date: '15 Oct 2020',
      image: 'https://placehold.co/300x200',
      link: '#',
    },
    {
      title: 'Nouvelle culture économique australienne',
      category: 'Culture',
      date: '12 Oct 2020',
      image: 'https://placehold.co/300x200',
      link: '#',
    },
    {
      title: 'Plan de conception de la ville intelligente 2025',
      category: 'Développement',
      date: '08 Oct 2020',
      image: 'https://placehold.co/300x200',
      link: '#',
    }
  ];


}
