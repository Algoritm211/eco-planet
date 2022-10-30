import {Component, OnDestroy, OnInit} from '@angular/core';
import {NearAuthService} from "./auth/core/services/near-auth.service";
import {Subject, takeUntil, tap} from "rxjs";
import {ContractService} from "./shared/contract/contract.service";
import { EcoNEAR } from './shared/contract/near-interface';

@Component({
  selector: 'maorix-eco-contract-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isSideNavOpened = false;

  unsubscribe$ = new Subject<void>();
  constructor(
    private contractService: ContractService,
    public nearAuthLogin: NearAuthService
  ) {
  }

  sideNavToggle() {
    this.isSideNavOpened = !this.isSideNavOpened
  }

  ngOnInit() {
    this.nearAuthLogin.initWallet()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(val => this.contractService.ecoNear = new EcoNEAR({walletToUse: val}))
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
