import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContributionScannerRoutingModule} from './contribution-scanner-routing.module';
import {ContributionScannerComponent} from './contribution-scanner.component';
import {BarcodeScannerComponent} from "./barcode-scanner/barcode-scanner.component";
import {NgxScannerQrcodeModule} from 'ngx-scanner-qrcode';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    ContributionScannerComponent,
    BarcodeScannerComponent
  ],
  imports: [
    CommonModule,
    ContributionScannerRoutingModule,
    NgxScannerQrcodeModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class ContributionScannerModule {
}
