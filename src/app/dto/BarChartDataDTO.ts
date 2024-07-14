
  export interface BarChartDataDTO {
    title: string;
    categories: string[];
    data: BarChartSeriesDTO[];
  }
  

  export interface BarChartSeriesDTO {
    name: string;
    data: number[];
    type: string;
  }