import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PersonalCabinetComponent} from "./personal-cabinet/personal-cabinet.component";

const routes: Routes = [
  {
    path: '',
    component: PersonalCabinetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
