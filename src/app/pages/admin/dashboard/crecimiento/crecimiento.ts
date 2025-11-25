import { BarChartComponent } from '@/components/atomics/bar-chart-component/bar-chart-component';
import { CardComponent } from '@/components/atomics/card-component/card-component';
import { FiltrosDashboard } from '@/components/atomics/filtros-dashboard/filtros-dashboard';
import { Color } from '@/types/color.type';
import { Component } from '@angular/core';
import { CircleChartComponent } from "@/components/atomics/circle-chart-component/circle-chart-component";

@Component({
  selector: 'app-crecimiento',
  imports: [CardComponent, FiltrosDashboard, BarChartComponent, CircleChartComponent],
  templateUrl: './crecimiento.html',
  styleUrl: './crecimiento.css',
})
export class Crecimiento {
  Color = Color;
}
