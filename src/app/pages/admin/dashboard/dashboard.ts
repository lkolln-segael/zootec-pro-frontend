import { SearchService } from '@/service/search.service';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { CardComponent } from "@/components/atomics/card-component/card-component";
import { Color } from '@/types/color.type';
import { BarChartComponent } from "@/components/atomics/bar-chart-component/bar-chart-component";
import { CircleChartComponent } from '@/components/atomics/circle-chart-component/circle-chart-component';
import { Enfermedad, TipoEnfermedad } from '@/types/enfermedad.type';
import { EnfermedadService } from '@/service/enfermedad.service';
import { AnimalService } from '@/service/animal.service';
import { Animal, Produccion } from '@/types/animal.type';
import { EstabloService } from '@/service/establos.service';
import { UsuarioForm } from '@/types/usuario.type';
import { UserService } from '@/service/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [CardComponent, BarChartComponent, CircleChartComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  readonly Color = Color

  private readonly searchService = inject(SearchService)

  private readonly enfermedadService = inject(EnfermedadService)
  private readonly animalService = inject(AnimalService)
  private readonly establoService = inject(EstabloService)
  private readonly usuarioService = inject(UserService)

  search = this.searchService.searchReadSignal

  tiposEnfermedades = signal([] as TipoEnfermedad[])

  enfermedadesLabels = computed(() => {
    return this.tiposEnfermedades().map(t => t.nombre)
  })

  leche = computed(() => {
    const año = new Date().getFullYear()
    const mes = new Date().getMonth()
    const leche = this.producciones()
      .filter(p => new Date(año, mes, 1) < new Date(p.fechaRegistro)
        && new Date(p.fechaRegistro) < new Date(año + (1 + mes) / 12, (mes + 1) % 12, 1))
      .map((p) => p.pesoLeche)
      .reduce((acc, p) => acc += p, 0)
    return `${leche}L`;
  })

  lecheComparacion = computed(() => {
    const año = new Date().getFullYear()
    let mes = new Date().getMonth()
    const lecheComparacion = this.producciones()
      .filter(p => new Date(año, mes, 1) < new Date(p.fechaRegistro)
        && new Date(p.fechaRegistro) < new Date(año + (1 + mes) / 12, (mes + 1) % 12, 1))
      .map((p) => p.pesoLeche)
      .reduce((acc, p) => acc += p, 0)
    mes = mes - 1 != 0 ? mes - 1 : 12
    const lecheComparacionMesAnterior = this.producciones()
      .filter(p => new Date(año, mes, 1) < new Date(p.fechaRegistro)
        && new Date(p.fechaRegistro) < new Date(año + (1 + mes) / 12, (mes + 1) % 12, 1))
      .map(p => p.pesoLeche)
      .reduce((acc, p) => acc += p, 0)
    return `${100 * (lecheComparacion - lecheComparacionMesAnterior + 1) / (lecheComparacionMesAnterior + 1)}% con respecto al mes anterior`
  })

  totalAnimales = computed(() => {
    const año = new Date().getFullYear()
    let mes = new Date().getMonth()
    const animales = this.animales()
      .filter(a => new Date(año, mes, 1) < new Date(a.fechaNacimiento)
        && new Date(a.fechaNacimiento) < new Date(año + (1 + mes) / 12, (mes + 1) % 12, 1))
      .length
    return `${animales} animales`
  })

  totalAnimalesComparacion = computed(() => {
    const año = new Date().getFullYear()
    let mes = new Date().getMonth()
    const animales = this.animales()
      .filter(a => new Date(año, mes, 1) < new Date(a.fechaNacimiento)
        && new Date(a.fechaNacimiento) < new Date(año + (1 + mes) / 12, (mes + 1) % 12, 1))
      .length
    mes = mes - 1 != 0 ? mes - 1 : 12
    const animalesMesAnterior = this.animales()
      .filter(a => new Date(año, mes, 1) < new Date(a.fechaNacimiento)
        && new Date(a.fechaNacimiento) < new Date(año + (1 + mes) / 12, (mes + 1) % 12, 1))
      .length
    return `${100 * (animales - animalesMesAnterior + 1) / (animalesMesAnterior + 1)}% con respecto al mes anterior`
  })

  numeroAnimales = computed(() => {
    const animalesMeses = []
    const año = new Date().getFullYear()
    for (let i = 0; i < 12; i++) {
      let mes = i
      const animales = this.animales()
        .filter(a => new Date(año, mes, 1) < new Date(a.fechaNacimiento)
          && new Date(a.fechaNacimiento) < new Date(año + (1 + mes) / 12, (mes + 1) % 12, 1))
        .length
      animalesMeses.push(animales)
    }
    return animalesMeses
  })

  chartLoaded = signal(0)

  loadChart = computed(() => {
    return this.chartLoaded() === 3
  })
  animales = signal<Animal[]>([])
  producciones = signal<Produccion[]>([])
  enfermedades = signal<Enfermedad[]>([])
  trabajadores = signal<UsuarioForm[]>([])


  enfermedadesCount = computed(() => {
    const enfermedadesCount = []
    for (let tipo of this.tiposEnfermedades()) {
      enfermedadesCount.push(this.enfermedades()
        .filter(e => e.tipoEnfermedad.nombre === tipo.nombre)
        .length)
    }
    return enfermedadesCount
  })

  produccionesMes = computed(() => {
    const año = new Date().getFullYear()
    const produccionesCount: number[] = []
    for (let produccion of this.producciones()) {
      const fechaRegistro = new Date(produccion.fechaRegistro)
      if (fechaRegistro.getFullYear() === año) {
        let value = produccionesCount[fechaRegistro.getMonth()]
        produccionesCount[fechaRegistro.getMonth()] = !Number.isFinite(value) ? produccion.pesoLeche : value + produccion.pesoLeche
      }
    }
    return produccionesCount
  })

  trabajadoresMes = computed(() => {
    const año = new Date().getFullYear()
    const trabajadoresCount: number[] = []
    for (let mes = 1; mes <= 12; mes++) {
      trabajadoresCount.push(this.trabajadores()
        .filter(t => new Date(año, mes - 1, 1) <= new Date(t.fechaCreacion!) &&
          new Date(t.fechaCreacion!) < new Date(año, mes, 1))
        .length)
    }
    console.log(trabajadoresCount)
    return trabajadoresCount
  })

  constructor() {

  }

  ngOnInit() {
    const establoId = localStorage.getItem("establoId")
    if (!establoId) {
      return
    }
    this.enfermedadService.getTipoEnfermedades()
      .subscribe({
        next: (res) => {
          this.tiposEnfermedades.set(res)
        }
      })
    this.animalService.getProduccionesByAño(establoId, new Date().getFullYear())
      .subscribe({
        next: (res) => {
          this.producciones.set(res.data)
          this.chartLoaded.update(value => value + 1)
        }
      })
    this.animalService.getAnimales(establoId)
      .subscribe({
        next: (res) => {
          this.animales.set(res.data)
          this.chartLoaded.update(value => value + 1)
        }
      })
    this.enfermedadService.getEnfermedades()
      .subscribe({
        next: (res) => {
          this.enfermedades.set(res.data)
          this.chartLoaded.update(value => value + 1)
        }
      })
    this.usuarioService.getTrabajadores(establoId)
      .subscribe({
        next: (res) => {
          this.trabajadores.set(res)
        }
      })
  }

}
