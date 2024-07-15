import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { API_URL, Psw, User } from '../constant/config';
import { LineChartDataDTO } from '../dto/LineChartDataDTO';
import { BarChartDataDTO } from '../dto/BarChartDataDTO';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {}

  //-------------- get request simple ---------------
  getRequest(url:string): Observable<any> {
    return this.http.get(`${API_URL}${url}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  //-------------- post request simple ---------------
  postRequest(url: string, data: any): Observable<any> {
    const options = {
      headers: this.getAuthHeaders(),
    };
    return this.http.post(`${API_URL}${url}`, data, options).pipe(
        catchError(this.handleError)
    );
  }
  //-------------- error handling -----------
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  //---------------authentication header----------------
  private getAuthHeaders(): HttpHeaders {
    const username = User;
    const password = Psw;

    if (username && password) {
      const credentials = btoa(encodeURIComponent(username) + ':' + encodeURIComponent(password));
      // console.log(credentials);
      const headers = new HttpHeaders({
        'Authorization': `Basic ${credentials}`
      });
      return headers;
    }
    return new HttpHeaders();
  }

  //---------------line chart data loading api----------------
  getLineChartData(): Observable<LineChartDataDTO> {
    return this.http.get<LineChartDataDTO>(`${API_URL}/api/line-data`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  //---------------bar chart data loading api----------------
  getBarChartData(): Observable<BarChartDataDTO> {
    return this.http.get<BarChartDataDTO>(`${API_URL}/api/bar-data`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }
}
