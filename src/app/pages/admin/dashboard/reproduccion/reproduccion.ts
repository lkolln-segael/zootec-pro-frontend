import { Component } from '@angular/core';
import { BarChartComponent } from "@/components/atomics/bar-chart-component/bar-chart-component";
import { FiltrosDashboard } from "@/components/atomics/filtros-dashboard/filtros-dashboard";
import { CardComponent } from "@/components/atomics/card-component/card-component";
import { Color } from '@/types/color.type';

@Component({
  selector: 'app-reproduccion',
  imports: [BarChartComponent, FiltrosDashboard, CardComponent],
  templateUrl: './reproduccion.html',
  styleUrl: './reproduccion.css',
})
export class Reproduccion {
  Color = Color
}
