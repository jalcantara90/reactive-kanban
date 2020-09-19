import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Open', 'In progress', 'blocked', 'To review', 'completed', 'closed'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55], label: 'Kanban project' },
    { data: [28, 48, 40, 19, 86, 27], label: 'Other project' },
    { data: [89, 12, 5, 16, 6, 71], label: 'Other project 2' },
    { data: [28, 26, 24, 13, 62, 17], label: 'Other project 3' },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
