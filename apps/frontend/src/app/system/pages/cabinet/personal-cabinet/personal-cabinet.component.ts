import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {NearAuthService} from "../../../../auth/core/services/near-auth.service";
import {ChangeNameDialogComponent} from "../change-name-dialog/change-name-dialog.component";
import {UserState} from "../../../../shared/ngxs/user/user.state";
import {Select, Store} from "@ngxs/store";
import {User} from "@maorix-contract/types";
import {LoadUserProfile} from "../../../../shared/ngxs/user/user.actions";
import {Observable} from "rxjs";

@Component({
  selector: 'maorix-personal-cabinet',
  templateUrl: './personal-cabinet.component.html',
  styleUrls: ['./personal-cabinet.component.css'],
})
export class PersonalCabinetComponent implements OnInit {
  //TODO mock data, we need to use real data
  infoList = [
    {icon: 'person_outline', propName: 'Name', propValue: 'Alexey'},
    {icon: 'local_florist', propName: 'Contributed', propValue: '10'},
    {icon: 'money_bag', propName: 'Your award', propValue: '4.67 NEAR'},
  ]

  @Select(UserState.getUser) user$: Observable<User>;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    public nearAuthService: NearAuthService
  ) {}

  ngOnInit() {
    this.store.dispatch(new LoadUserProfile()).subscribe(
      val => console.log(val)
    )
  }

  openChangeNameDialog() {
    this.dialog.open(ChangeNameDialogComponent, {
      width: '250px',
      data: {name: this.infoList[1].propValue},
    });
  }
}
