import { SearchService } from '@/service/search.service';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { CardComponent } from "@/components/atomics/card-component/card-component";
import { Color } from '@/types/color.type';
import { BarChartComponent } from "@/components/atomics/bar-chart-component/bar-chart-component";
import { CircleChartComponent } from '@/components/atomics/circle-chart-component/circle-chart-component';
import { TipoEnfermedad } from '@/types/enfermedad.type';
import { EnfermedadService } from '@/service/enfermedad.service';

@Component({
  selector: 'app-dashboard',
  imports: [CardComponent, BarChartComponent, CircleChartComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  readonly Color = Color

  private readonly searchService = inject(SearchService)

  search = this.searchService.searchReadSignal

  tiposEnfermedades = signal([] as TipoEnfermedad[])

  enfermedadesLabels = computed(() => {
    return this.tiposEnfermedades().map(t => t.nombre)
  })

  enfermedadService = inject(EnfermedadService)

  ngOnInit() {
    this.enfermedadService.getTipoEnfermedades()
      .subscribe({
        next: (res) => {
          this.tiposEnfermedades.set(res)
        }
      })
  }

}
