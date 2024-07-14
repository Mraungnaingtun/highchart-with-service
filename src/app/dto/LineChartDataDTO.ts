
export interface LineChartDataDTO {
    title: string;
    categories: string[];
    data: SeriesDTO[];
}


export interface SeriesDTO {
    name: string;
    type: string;
    data: number[];
}