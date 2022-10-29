import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContributionScannerRoutingModule} from './contribution-scanner-routing.module';
import {ContributionScannerComponent} from './contribution-scanner.component';
import {BarcodeScannerComponent} from "./barcode-scanner/barcode-scanner.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [
    ContributionScannerComponent,
    BarcodeScannerComponent
  ],
  imports: [
    CommonModule,
    ContributionScannerRoutingModule,
    ZXingScannerModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class ContributionScannerModule {
}
