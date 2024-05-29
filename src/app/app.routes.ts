import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { MapScreenComponent } from './maps/screens/map-screen/map-screen.component';
import { authGuard, loginGuard } from './auth/guards/auth.guard';
import { PageNotFoundComponent } from './auth/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'maps',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'maps',
    component: MapScreenComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
