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
  visitorChangePercentage: number = 0;
  earnValue= 0;
  orderValue = 0;
  averageDuration = 0;


  chartData: { data: number[]; label: string; borderColor: string; backgroundColor: string; fill: boolean; }[] = [
    {
      data: [],
      label: 'Visites',
      borderColor: '#205292',
      backgroundColor: 'rgba(75,192,192,0.2)',
      fill: true,
    },
  ];
  chartLabels: string[] = [];
  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4  // smooth lines
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        intersect: false,
      },
      filler: {
        propagate: false,
      },
    },
    hover: {
      intersect: true,
    }
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
    this.calculateVisitorComparisonBetween2Weeks()
  }

  setDefaultSinceDate(): void {
    const now = new Date();
    this.sinceDate = new Date(now.setDate(now.getDate() - 7)).toISOString().split('T')[0];
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

  calculateVisitorComparisonBetween2Weeks() {
    const now = new Date();
    let sinceDate = new Date(now.setDate(now.getDate() - 14)).toISOString().split('T')[0];
    const halfwayDate = new Date(now.setDate(now.getDate() + 7)).toISOString().split('T')[0];

    this.visitorService.getVisitsDailySince(sinceDate).subscribe({
      next: (data) => {
        let firstWeekCount = 0;
        let secondWeekCount = 0;

        data.dailyVisits.forEach((element) => {
          const elementDate = new Date(element.date);
          const halfway = new Date(halfwayDate);

          if (elementDate < halfway) {
            firstWeekCount += element.count;
          } else {
            secondWeekCount += element.count;
          }
        });

        let increase = secondWeekCount - firstWeekCount;
        this.visitorChangePercentage = (firstWeekCount > 0) ? (increase / firstWeekCount) * 100 : 0;
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
