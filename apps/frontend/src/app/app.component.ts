import {Component, OnDestroy, OnInit} from '@angular/core';
import {NearAuthService} from "./auth/core/services/near-auth.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'maorix-contract-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject<void>();
  constructor(public nearAuthLogin: NearAuthService) {
  }

  ngOnInit() {
    this.nearAuthLogin.initWallet()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe()
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
