import { Routes } from '@angular/router';
import { HomePage } from './pages/public/home-page/home-page';
import { NotFoundPage } from './pages/public/not-found-page/not-found-page';
import { RegistrarPage } from './pages/public/registrar/registrar';
import { LoginPage } from './pages/public/login/login';
import { Layout } from './components/organics/layout/layout';
import { EstablosPage } from './pages/public/establos/establos';

export const routes: Routes = [
  {
    path: "",
    component: HomePage
  },
  {
    path: "login",
    component: LoginPage
  },
  {
    path: "registrar",
    component: RegistrarPage
  },
  {
    path: "admin",
    loadChildren: () => import("@/routes/admin.routes").then(c => c.ADMIN_ROUTES)
  },
  {
    path: "veterinario",
    loadChildren: () => import("@/routes/veterinario.routes").then(c => c.VETERINARIO_ROUTES)
  },
  {
    path: "operario",
    loadChildren: () => import("@/routes/operario.routes").then(c => c.OPERARIO_ROUTES)
  },
  {
    path: "establos",
    component: EstablosPage
  },
  {
    path: "**",
    component: NotFoundPage
  }
];
