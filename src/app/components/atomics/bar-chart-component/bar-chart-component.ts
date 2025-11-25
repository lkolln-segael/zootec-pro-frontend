import { Component, ElementRef, input, signal, viewChild } from '@angular/core';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-bar-chart-component',
  imports: [],
  templateUrl: './bar-chart-component.html',
  styleUrl: './bar-chart-component.css',
})
export class BarChartComponent {
  id = signal(window.crypto.randomUUID()).asReadonly()
  meses = signal(['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto'
    , 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'])


  items = input<string[]>([])
  titulo = input("Titulo generico")
  valores = input<number[]>([])
  horizontal = input<boolean>(false)


  private backgroundColor: string[] = ['rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)']
  chart: any

  ngAfterViewInit() {
    this.chart = new Chart(this.id(), {
      type: 'bar',
      data: {
        labels: this.meses(),
        datasets: [{
          indexAxis: this.horizontal() ? 'y' : 'x',
          data: this.valores(),
          backgroundColor: this.backgroundColor,
          label: this.titulo(),
          borderWidth: 1
        }]
      }
    })
  }
}
