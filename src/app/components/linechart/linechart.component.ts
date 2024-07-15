import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ChartModule } from 'angular-highcharts';
import { ApiService } from '../../service/ApiService';
import { LineChartDataDTO, SeriesDTO } from '../../dto/LineChartDataDTO';

@Component({
  selector: 'app-linechart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './linechart.component.html',
  styleUrl: './linechart.component.css'
})
export class LinechartComponent {

  //----- dto
  chartData: LineChartDataDTO | undefined;
  //---- chart
  lineChart: Chart | undefined;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getLineChartData().subscribe(data => {
      this.chartData = data;

      const series = this.chartData.data.map((s: SeriesDTO) => ({
        name: s.name,
        type: s.type as 'line',
        data: s.data
      } as Highcharts.SeriesOptionsType));


      this.lineChart = new Chart({
        chart: {
          type: 'line',
          zooming: {
            type: 'xy'
          }
        },
        title: {
          text: this.chartData.title
        },
        xAxis: {
          categories: this.chartData.categories
        },
        yAxis: {
          title: {
            text: 'Amount'
          }
        },
        series: series,
        credits: {
          enabled: false
        }
      });
      console.log("line chart data: " + this.chartData);
    });
  }
}






