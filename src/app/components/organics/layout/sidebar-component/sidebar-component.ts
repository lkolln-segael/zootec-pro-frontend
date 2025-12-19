import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type SubLinks = {
  nombre: string;
  url: string;
  icon: string;
  authorities?: string[]
}

type Navigation = {
  title: string;
  sublinks: SubLinks[];
  authorities?: string[]
}


@Component({
  selector: 'app-sidebar-component',
  imports: [RouterLink],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css',
})
export class SidebarComponent {

  authority = input<string>("")

  navigationAdmin: Navigation[] = [
    {
      title: 'Navigation',
      sublinks: [
        {
          nombre: 'Dashboard',
          url: 'dashboard',
          icon: 'house'
        }
      ]
    },
    {
      title: "Estadisticas",
      sublinks: [
        {
          nombre: 'Reproduccion',
          url: 'estadistica/reproduccion',
          icon: 'tv'
        },
        {
          nombre: 'Crecimiento',
          url: 'estadistica/crecimiento',
          icon: 'lungs'
        },
        {
          nombre: 'Productividad',
          url: 'estadistica/productividad',
          icon: 'arrow-up-right-dots'
        }
      ]
    },
    {
      title: "Registro",
      sublinks: [
        {
          nombre: 'Reproduccion',
          url: 'registro/reproduccion',
          icon: 'child'
        },
        {
          nombre: 'Crecimiento',
          url: 'registro/crecimiento',
          icon: 'seedling'
        },
        {
          nombre: 'Animal',
          url: 'registro/animal',
          icon: 'cow'
        },
        {
          nombre: 'Sanidad',
          url: 'registro/sanidad',
          icon: 'pills'
        },
        {
          nombre: "Produccion",
          url: 'registro/produccion',
          icon: 'arrow-up-right-dots'
        }
      ]
    },
    {
      title: "Tablas",
      sublinks: [
        {
          nombre: 'Animales',
          url: "animales",
          icon: "cow"
        },
        {
          nombre: "Enfermedades",
          url: "enfermedades",
          icon: "bacteria"
        },
        {
          nombre: "Produccion",
          url: "produccion",
          icon: "blender"
        }
      ]
    },
    {
      title: "Usuarios",
      sublinks: [
        {
          nombre: "Insertar",
          url: "usuarios/insertar",
          icon: "floppy-disk"
        },
        {
          nombre: "Editar",
          url: "usuarios/editar",
          icon: "pen-to-square"
        }
      ]
    },
    {
      title: "Establo",
      sublinks: [
        {
          nombre: "Editar",
          url: "establo/editar",
          icon: "pen-to-square"
        }
      ]
    }
  ]

  navigation = computed(() => {
    switch (this.authority()) {
      case "OPERARARIO":
        return this.navigationAdmin.filter(t => !(["Usuarios", "Establo"].includes(t.title)))
          .map(t => {
            t.sublinks = t.sublinks.filter(s => !(["Sanidad", "Reproduccion"].includes(s.nombre)))
            return t
          })
      case "VETERINARIO":
        return this.navigationAdmin.filter(t => !(["Usuarios", "Establo"].includes(t.title)))
          .map(t => {
            t.sublinks = t.sublinks.filter(s => !(["Produccion"].includes(s.nombre)))
            return t
          })
      default:
        return this.navigationAdmin
    }
  })

  cerrarSesion() {
    localStorage.removeItem("establoId")
    sessionStorage.removeItem("token")
    window.location.href = "/"
  }

  icon(iconType: string) {
    return `fa-solid fa-${iconType}`
  }
}
