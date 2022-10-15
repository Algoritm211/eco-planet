import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import {Observable, tap} from 'rxjs';
import {NearAuthService} from "../services/near-auth.service";

@Injectable({
  providedIn: 'root'
})
export class IsAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: NearAuthService
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isSignedIn$.pipe(
      tap((isSignedIn) => {
        if (!isSignedIn) {
          alert('You need to sign in first')
          this.router.navigate(['/login']);
        }
      })
    )
  }

}
