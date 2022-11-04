import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Result} from "@zxing/library";
import {ContributionDTO} from "@maorix-contract/types";
import {ContractService} from "../../../../shared/contract/contract.service";
import {finalize} from "rxjs";


@Component({
  selector: 'maorix-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css'],
})
export class BarcodeScannerComponent {
  MOCK_CONTRIBUTION: ContributionDTO = {
    amount: 7
  }

  constructor(
    private contractService: ContractService,
    private router: Router
  ) {
  }

  handleMockData() {
    this.contractService.makeContribution(this.MOCK_CONTRIBUTION)
      .pipe(
        finalize(() => this.router.navigate(['/cabinet']))
      ).subscribe();
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
