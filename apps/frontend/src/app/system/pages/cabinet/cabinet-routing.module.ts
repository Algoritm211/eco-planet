import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CabinetComponent} from "./cabinet.component";

const routes: Routes = [
  {
    path: '',
    component: CabinetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
