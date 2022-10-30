import {Injectable} from '@angular/core';
import {BehaviorSubject, from, switchMap, tap} from 'rxjs';
import {getConfig} from "../../../../near-config";
import {connect, WalletConnection} from "near-api-js";
import {Router} from "@angular/router";
import {CONTRACT_ID} from "../../../shared/constants";

@Injectable({
  providedIn: 'root'
})
export class NearAuthService {

  private walletStatus = new BehaviorSubject<WalletConnection>({} as WalletConnection);
  private isSignedInStatus = new BehaviorSubject<boolean>(false);
  public wallet$ = this.walletStatus.asObservable();
  public isSignedIn$ = this.isSignedInStatus.asObservable();

  constructor(
    private router: Router
  ) {}

  initWallet() {
    return from(
      connect(getConfig())
    ).pipe(
      // Step 1 - getting near object and return wallet
      switchMap(async (near) => {
        return new WalletConnection(near, 'my-app')
      }),
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
      contractId: CONTRACT_ID,
      methodNames: ['addUser', 'getUser', 'getUsers', 'newIncomeDataFromUser'],
    })).subscribe();
  }

  logout() {
    this.walletStatus.value.signOut()
    this.isSignedInStatus.next(false)
    this.router.navigate(['/login']);
    console.log('You are signed out')
  }
}
