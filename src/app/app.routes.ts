import { Routes } from '@angular/router';
import { BarchartComponent } from './components/barchart/barchart.component';
import { LinechartComponent } from './components/linechart/linechart.component';
import { PiechartComponent } from './components/piechart/piechart.component';
import { SummaryComponent } from './components/summary/summary.component';

export const routes: Routes = [
    { path: '', redirectTo: '/summary', pathMatch: 'full' },
    { path: 'barchart', component: BarchartComponent },
    { path: 'linechart', component: LinechartComponent },
    { path: 'piechart', component: PiechartComponent },
    { path: 'summary', component: SummaryComponent },
];
