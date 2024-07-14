import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ChartModule } from 'angular-highcharts';
import { ApiService } from '../../service/ApiService';
import { BarChartDataDTO, BarChartSeriesDTO } from '../../dto/BarChartDataDTO';

@Component({
  selector: 'app-barchart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './barchart.component.html',
  styleUrl: './barchart.component.css'
})
export class BarchartComponent {

  //--- chart
  barChart: Chart | undefined;

  //dto
  chartData: BarChartDataDTO | undefined;

  constructor(private appService: ApiService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.appService.getBarChartData()
      .subscribe(response => {
        console.log(response);
        if (response) {
          this.chartData = response;

          const series = this.chartData.data.map((s: BarChartSeriesDTO) => ({
            name: s.name,
            type: s.type as 'column',
            data: s.data
          } as Highcharts.SeriesOptionsType));


          this.barChart = new Chart({
            chart: {
              type: 'column'
            },
            title: {
              text: this.chartData.title
            },
            xAxis: {
              categories: this.chartData.categories
            },
            yAxis: {
              title: {
                text: 'Quantity'
              }
            },
            series: series,
            credits: {
              enabled: false
            }
          });
        } else {
          console.error('Error fetching API data');
        }
      });
  }

}
