import { Component, OnInit } from '@angular/core';
import { VisitorService } from '../../../service/visitor.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  imports: [
    BaseChartDirective,
    FormsModule
  ]
})
export class AdminDashboardComponent implements OnInit {
  todayVisitors: number = 0;
  sinceDate: string = '';

  chartData: { data: number[]; label: string; borderColor: string; backgroundColor: string; fill: boolean; }[] = [
    {
      data: [],
      label: 'Visites',
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.2)',
      fill: true,
    },
  ];
  chartLabels: string[] = [];
  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
    },
  };

  constructor(
    private visitorService: VisitorService,
    private toastrService: ToastrService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadTodayVisitors();
    this.setDefaultSinceDate();
    this.loadVisitsSince();
  }

  setDefaultSinceDate(): void {
    const now = new Date();
    this.sinceDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
  }

  loadTodayVisitors(): void {
    this.visitorService.getTodayVisitors().subscribe({
      next: (count) => {
        this.todayVisitors = count;
      },
      error: (err) => {
        this.toastrService.error('Erreur lors de la récupération des visites :', err.message);
      },
    });
  }

  loadVisitsSince(): void {
    this.visitorService.getVisitsDailySince(this.sinceDate).subscribe({
      next: (data) => {
        this.updateChart(data.dailyVisits);
      },
      error: (err) => {
        this.toastrService.error('Erreur lors de la récupération des visites :', err.message);
      },
    });
  }

  updateChart(dailyVisits: { date: string; count: number }[]): void {
    const startDate = new Date(this.sinceDate);
    const endDate = new Date();
    const dateRange = [];

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      dateRange.push(date.toISOString().split('T')[0]);
    }

    const visitCounts = dateRange.map(date => {
      const visit = dailyVisits.find(v => v.date.split('T')[0] === date);
      return visit ? visit.count : 0;
    });

    this.chartLabels = dateRange;
    this.chartData[0].data = visitCounts;
  }
}
