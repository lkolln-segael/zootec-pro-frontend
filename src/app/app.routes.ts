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
    path: "establos",
    component: EstablosPage
  },
  {
    path: "**",
    component: NotFoundPage
  }
];
