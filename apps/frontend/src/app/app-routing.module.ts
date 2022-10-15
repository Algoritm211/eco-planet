import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IsAuthGuard} from "./auth/core/guards/is-auth.guard";

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./system/pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [IsAuthGuard]
  },
  {
    path: 'cabinet',
    loadChildren: () => import('./system/pages/cabinet/cabinet.module').then((m) => m.CabinetModule),
    canActivate: [IsAuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
