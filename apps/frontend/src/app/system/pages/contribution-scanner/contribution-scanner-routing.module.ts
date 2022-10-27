import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContributionScannerComponent} from "./contribution-scanner.component";

const routes: Routes = [
  {
    path: '',
    component: ContributionScannerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContributionScannerRoutingModule { }
