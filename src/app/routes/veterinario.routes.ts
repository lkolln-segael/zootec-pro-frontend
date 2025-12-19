import { Layout } from "@/components/organics/layout/layout";
import { authAdminGuard, veterinarioGuard } from "@/guards/auth-guard";
import { Route } from "@angular/router";

export const VETERINARIO_ROUTES: Route[] = [
  {
    path: "",
    component: Layout,
    canActivate: [veterinarioGuard],
    children: [
      {
        path: "dashboard",
        loadComponent: () => import("@/pages/admin/dashboard/dashboard")
          .then(c => c.Dashboard)
      },
      {
        path: "estadistica/crecimiento",
        loadComponent: () => import("@/pages/admin/dashboard/crecimiento/crecimiento")
          .then(c => c.Crecimiento)
      },
      {
        path: "estadistica/productividad",
        loadComponent: () => import("@/pages/admin/dashboard/productividad/productividad")
          .then(c => c.Productividad)
      },
      {
        path: "estadistica/reproduccion",
        loadComponent: () => import("@/pages/admin/dashboard/reproduccion/reproduccion")
          .then(c => c.Reproduccion)
      },
      {
        path: "registro/produccion",
        loadComponent: () => import("@/pages/admin/registro/produccion/produccion")
          .then(c => c.Produccion)
      },
      {
        path: "registro/reproduccion",
        loadComponent: () => import("@/pages/admin/registro/reproduccion/reproduccion")
          .then(c => c.Reproduccion)
      },
      {
        path: "registro/crecimiento",
        loadComponent: () => import("@/pages/admin/registro/crecimiento/crecimiento")
          .then(c => c.Crecimiento)
      },
      {
        path: "registro/animal",
        loadComponent: () => import("@/pages/admin/registro/animal/animal")
          .then(c => c.Animal)
      },
      {
        path: "registro/sanidad",
        loadComponent: () => import("@/pages/admin/registro/enfermedades/enfermedades")
          .then(c => c.Enfermedades)
      },
      {
        path: "animales",
        loadComponent: () => import("@/pages/admin/animales/animales")
          .then(c => c.Animales)
      },
      {
        path: "enfermedades",
        loadComponent: () => import("@/pages/admin/enfermedades/enfermedades")
          .then(c => c.Enfermedades)
      },
      {
        path: "produccion",
        loadComponent: () => import("@/pages/admin/produccion/produccion")
          .then(c => c.Produccion)
      },
      {
        path: "usuarios/insertar",
        loadComponent: () => import("@/pages/admin/usuarios/usuario-insertar/usuario-insertar")
          .then(c => c.UsuarioInsertar)
      },
      {
        path: "usuarios/editar",
        loadComponent: () => import("@/pages/admin/usuarios/usuario-editar/usuario-editar")
          .then(c => c.UsuarioEditar)
      },
      {
        path: "establo/editar",
        loadComponent: () => import("@/pages/admin/establo/establo-editar/establo-editar")
          .then(c => c.EstabloEditar)
      }
    ]
  },
]
