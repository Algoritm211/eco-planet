import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContributionScannerRoutingModule } from './contribution-scanner-routing.module';
import { ContributionScannerComponent } from './contribution-scanner.component';
import {BarcodeScannerComponent} from "./barcode-scanner/barcode-scanner.component";

@NgModule({
  declarations: [ContributionScannerComponent, BarcodeScannerComponent],
  imports: [CommonModule, ContributionScannerRoutingModule],
})
export class ContributionScannerModule {}
