import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartModule, Chart } from 'angular-highcharts';
import Accessibility from 'highcharts/modules/accessibility';

Accessibility(Highcharts);

@Component({
  selector: 'app-combination-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './combination-chart.component.html',
  styleUrl: './combination-chart.component.css'
})
export class CombinationChartComponent {

  chart: Chart;
  secondaryColor = '#4CAF50';

  constructor() {
    this.chart = new Chart({
      accessibility: {
        enabled: true
      },
      chart: {
        zooming: {
          type: 'xy'
        }
      },
      title: {
        text: 'Karasjok weather, 2023',
        align: 'left'
      },
      xAxis: [{
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value}°C',
          style: {
            color: this.secondaryColor
          }
        },
        title: {
          text: 'Temperature',
        }
      }, { // Secondary yAxis
        title: {
          text: 'Precipitation',
        },
        labels: {
          format: '{value} mm',
        },
        opposite: true
      }],
      tooltip: {
        shared: true
      },
      legend: {
        align: 'left',
        verticalAlign: 'top',
        backgroundColor: Highcharts.defaultOptions.legend?.backgroundColor || 'rgba(255,255,255,0.25)'
      },
      series: [{
        name: 'Precipitation',
        type: 'column',
        yAxis: 1,
        data: [
          45.7, 37.0, 28.9, 17.1, 39.2, 18.9, 90.2, 78.5, 74.6,
          18.7, 17.1, 16.0
        ],
        tooltip: {
          valueSuffix: ' mm'
        }

      }, {
        name: 'Temperature',
        type: 'spline',
        data: [
          -11.4, -9.5, -14.2, 0.2, 7.0, 12.1, 13.5, 13.6, 8.2,
          -2.8, -12.0, -15.5
        ],
        tooltip: {
          valueSuffix: '°C'
        }
      }]
    });
  }
}
