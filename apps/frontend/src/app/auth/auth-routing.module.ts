import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NearLoginComponent} from "./near-login/near-login.component";

const routes: Routes = [
  {
    path: '',
    component: NearLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NearRoutingModule { }
