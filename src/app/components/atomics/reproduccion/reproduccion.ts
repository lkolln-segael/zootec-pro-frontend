import { ReproduccionService } from '@/service/reproduccion.service';
import { Seca, Prenez, ConfirmacionPrenez, Aborto, Parto, RegistroReproduccion } from '@/types/reproduccion.type';
import { Component, computed, effect, inject, input, signal } from '@angular/core';

@Component({
  selector: 'app-reproduccion',
  imports: [],
  templateUrl: './reproduccion.html',
  styleUrl: './reproduccion.css',
})
export class Reproduccion {
  animalId = input<string>("");

  reproducciones = signal<Record<string, any>[]>([])

  secas = signal<Seca[]>([]);
  prenez = signal<Prenez[]>([]);
  confirmaciones = signal<ConfirmacionPrenez[]>([]);
  abortos = signal<Aborto[]>([]);
  partos = signal<Parto[]>([]);

  tabSelected = signal(0)

  prenezActiva = computed(() => {
    return this.tabSelected() === 0 ? ' active' : ''
  })

  confirmacionesActiva = computed(() => {
    return this.tabSelected() === 1 ? ' active' : ''
  })

  abortoActiva = computed(() => {
    return this.tabSelected() === 3 ? ' active' : ''
  })

  partoActiva = computed(() => {
    return this.tabSelected() === 2 ? ' active' : ''
  })

  secaActiva = computed(() => {
    return this.tabSelected() === 4 ? ' active' : ''
  })

  // Señal para controlar la carga
  isLoading = signal(true);

  constructor() {
    effect(() => {
      console.log(this.tabSelected())
    })
  }

  reproduccionService = inject(ReproduccionService)

  ngOnInit() {
    this.cargarRegistros();
  }

  cargarRegistros() {
    this.isLoading.set(true);
    this.reproduccionService.getReproducciones(this.animalId())
      .subscribe({
        next: (res) => {
          this.reproducciones.set(res.data)
          this.isLoading.set(false)
        },
        complete: () => {
          this.procesarRegistros(this.reproducciones() as RegistroReproduccion[])
        }
      })
  }

  procesarRegistros(registros: RegistroReproduccion[]) {
    // Limpiar arrays previos
    this.secas.set([]);
    this.prenez.set([]);
    this.confirmaciones.set([]);
    this.abortos.set([]);
    this.partos.set([]);

    // Separar registros por tipo
    registros.forEach(registro => {
      switch (registro.tipo) {
        case 'SECA':
          this.secas.update(secas => [...secas, registro as Seca]);
          break;
        case 'PRENEZ':
          this.prenez.update(prenez => [...prenez, registro as Prenez]);
          break;
        case 'CONFIRMACION_PRENEZ':
          this.confirmaciones.update(confirmaciones => [...confirmaciones, registro as ConfirmacionPrenez]);
          break;
        case 'ABORTO':
          this.abortos.update(abortos => [...abortos, registro as Aborto]);
          break;
        case 'PARTO':
          this.partos.update(partos => [...partos, registro as Parto]);
          break;
      }
    });
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
