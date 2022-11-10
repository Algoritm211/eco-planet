import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription } from 'rxjs';

@Component({
  selector: 'maorix-new-season-timer',
  templateUrl: './new-season-timer.component.html',
  styleUrls: ['./new-season-timer.component.css'],
})
export class NewSeasonTimerComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  dDay = new Date('Dec 01 2022 00:00:00');
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  timeDifference: number;
  secondsToDday: number;
  minutesToDday: number;
  hoursToDday: number;
  daysToDday: number;


  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference: number) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }

  ngOnInit() {
    this.subscription = interval(1000)
      .subscribe(() => {
        this.getTimeDifference();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
