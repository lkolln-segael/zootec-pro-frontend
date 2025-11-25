import { BarChartComponent } from '@/components/atomics/bar-chart-component/bar-chart-component';
import { CardComponent } from '@/components/atomics/card-component/card-component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-productividad',
  imports: [BarChartComponent, CardComponent],
  templateUrl: './productividad.html',
  styleUrl: './productividad.css',
})
export class Productividad {

}
