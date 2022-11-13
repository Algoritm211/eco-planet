import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "@maorix-contract/types";
import {Select} from "@ngxs/store";
import {UserState} from "../../../../shared/ngxs/user/user.state";
import {Observable, Subject, takeUntil} from "rxjs";
import {getMultiplier} from "./utils/multiplier";

@Component({
  selector: 'maorix-session-info',
  templateUrl: './session-info.component.html',
  styleUrls: ['./session-info.component.css'],
})
export class SessionInfoComponent implements OnInit, OnDestroy {

  multiplier: number;
  possibleEarnings: number;

  unsubscribe$ = new Subject<void>()

  @Select(UserState.getUser) user$: Observable<User>;

  constructor() {}

  ngOnInit() {
    this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      if (user.rank) {
        this.multiplier = getMultiplier(user.rank);
        this.possibleEarnings = this.multiplier * user.award;
      }
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
