import { Injectable } from '@angular/core';
import {from, Subject, switchMap, tap} from 'rxjs';
import {getConfig} from "../../../../../near-config";
import {connect, WalletConnection} from "near-api-js";

@Injectable({
  providedIn: 'root'
})
export class NearLoginService {

  private walletStatus = new Subject<WalletConnection>();
  walletStatus$ = this.walletStatus.asObservable();

  constructor() { }

  getWallet() {
    return from(
      connect(getConfig())
    ).pipe(
      // Step 1 - getting near object and return wallet
      switchMap(async (near) => {
        return new WalletConnection(near, 'my-app')
      }),
      // Step 2 - emitting value of wallet
      tap((val) => {
        this.walletStatus.next(val)
      })
    )
  }
}
