import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Result} from "@zxing/library";

@Component({
  selector: 'maorix-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css'],
})
export class BarcodeScannerComponent {
  constructor(private router: Router) {
  }

  handleData($event: Result) {
    if ($event?.getText()) {
      console.log($event.getText())
      void this.router.navigate(['/dashboard'])
    }
  }

  checkPermissions($event: boolean) {
    if (!$event) {
      alert('Please check your camera permissions and reaload the page')
    }
  }
}
