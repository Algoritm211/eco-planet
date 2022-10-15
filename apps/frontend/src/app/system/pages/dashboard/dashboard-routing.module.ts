import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersDashboardComponent} from "./users-dashboard/users-dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: UsersDashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
