import {Injectable} from '@angular/core';
import {BehaviorSubject, from, switchMap, tap} from 'rxjs';
import {getConfig} from "../../../../../near-config";
import {connect, WalletConnection} from "near-api-js";

@Injectable({
  providedIn: 'root'
})
export class NearAuthService {

  private walletStatus = new BehaviorSubject<WalletConnection>({} as WalletConnection);
  private isSignedInStatus = new BehaviorSubject<boolean>(false);
  wallet$ = this.walletStatus.asObservable();
  isSignedIn$ = this.isSignedInStatus.asObservable();

  constructor() {}

  initWallet() {
    return from(
      connect(getConfig())
    ).pipe(
      // Step 1 - getting near object and return wallet
      switchMap(async (near) => {
        return new WalletConnection(near, 'my-app')
      }),
      // delay( 1),
      // Step 2 - emitting value of wallet
      tap(async (val) => {
        this.walletStatus.next(val)
        const isSignedInAsync = await val.isSignedInAsync();
        if (isSignedInAsync) {
          this.isSignedInStatus.next(true)
        }
      })
    )
  }

  login() {
    from(this.walletStatus.value.requestSignIn({
      contractId: 'wrap.testnet',
      methodNames: ['near_deposit', 'ft_balance_of', 'near_withdraw'],
    })).subscribe();
  }

  logout() {
    this.walletStatus.value.signOut()
    this.isSignedInStatus.next(false)
    console.log('You are signed out')
  }
}
