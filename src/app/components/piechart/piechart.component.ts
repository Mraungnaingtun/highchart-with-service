import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ChartModule } from 'angular-highcharts';
import { ApiService } from '../../service/ApiService';
import { PieChartDTO } from '../../dto/PieChartDTO';

@Component({
  selector: 'app-piechart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './piechart.component.html',
  styleUrl: './piechart.component.css'
})
export class PiechartComponent {
  //chart
  pieChart: Chart | undefined;
  //api service
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.apiService.getRequest("/api/pie-data")
      .subscribe(response => {
        console.log(response);
        if (response) {
          const pieData: PieChartDTO[] = [];
        for (const item of response) {
          pieData.push({
            name: item.name, 
            y: item.value 
          });
        }

          console.log(pieData);
          this.pieChart = new Chart({
            chart: {
              type: 'pie'
            },
            title: {
              text: 'Pie Chart Example'
            },
            series: [
              {
                name: 'Percent',
                type: 'pie',
                data: pieData
              }
            ],
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
