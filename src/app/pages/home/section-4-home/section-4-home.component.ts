import {Component, OnInit} from '@angular/core';
import {NewsService} from '../../../service/news.service';
import {DatePipe} from '@angular/common';
import { News } from '../../../models/news.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-section-4-home',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './section-4-home.component.html',
  styleUrl: './section-4-home.component.scss'
})
export class Section4HomeComponent implements OnInit {

  news: News[] = [];

  constructor(private newsService: NewsService) {

  }

  ngOnInit(): void {
    this.newsService.getNews().subscribe(news => this.news = news.data);
  }


  // news = [
  //   {
  //     title: 'Liste des célébrations du week-end de la ville',
  //     category: 'Gouvernement',
  //     date: '15 Oct 2020',
  //     image: 'https://placehold.co/300x200',
  //     link: '#',
  //   },
  //   {
  //     title: 'Nouvelle culture économique australienne',
  //     category: 'Culture',
  //     date: '12 Oct 2020',
  //     image: 'https://placehold.co/300x200',
  //     link: '#',
  //   },
  //   {
  //     title: 'Plan de conception de la ville intelligente 2025',
  //     category: 'Développement',
  //     date: '08 Oct 2020',
  //     image: 'https://placehold.co/300x200',
  //     link: '#',
  //   }
  // ];


}
