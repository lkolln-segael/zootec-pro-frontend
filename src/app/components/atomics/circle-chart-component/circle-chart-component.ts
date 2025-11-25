import { Component, input, signal } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables)

@Component({
  selector: 'app-circle-chart-component',
  imports: [],
  templateUrl: './circle-chart-component.html',
  styleUrl: './circle-chart-component.css',
})
export class CircleChartComponent {
  labels = input<string[]>([])
  id = signal(window.crypto.randomUUID())
  valores = input<number[]>([])
  titulo = input("Titulo generico")

  private backgroundColor: string[] = ['rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)']

  ngAfterViewInit() {
    const chart = new Chart(this.id(), {
      type: 'doughnut',
      data: {
        labels: this.labels(),
        datasets: [{
          label: this.titulo(),
          data: this.valores(),
          backgroundColor: this.backgroundColor
        }]
      }
    })
  }
}
