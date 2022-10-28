import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgxScannerQrcodeComponent} from "ngx-scanner-qrcode";

@Component({
  selector: 'maorix-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css'],
})
export class BarcodeScannerComponent {
  @ViewChild('action', { static: true }) scanner: NgxScannerQrcodeComponent;

  constructor(
    private router: Router,
  ) {}

  handleData($event: string) {
    if ($event) {
      this.scanner.stop().complete()
      void this.router.navigate(['/dashboard'])
    }
  }

  onError($event: ErrorEvent) {
    if ($event.message === 'Permission denied') {
      alert('Please check your camera permissions')
    }
  }
}
