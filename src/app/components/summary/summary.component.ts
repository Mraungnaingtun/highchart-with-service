import { Component } from '@angular/core';
import { ApiService } from '../../service/ApiService';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
  

  //dash borad number
  totalAccountNumbers = 0;
  totalUniqueCustomers = 0;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.apiService.getRequest("/general/summary-data").subscribe({
      next: (response: any) => {
        this.totalAccountNumbers = response.totalAccountNumbers;
        this.totalUniqueCustomers= response.totalUniqueCustomers;
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      }
    });
  }

}
