import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {UserState} from "../../../shared/ngxs/user/user.state";
import {Observable} from "rxjs";
import {User} from "@maorix-contract/types";
import {DataStatus} from "../../../shared/types";
import {MatDialog} from "@angular/material/dialog";
import {NearAuthService} from "../../../auth/core/services/near-auth.service";
import {AddNewUser, LoadUserProfile} from "../../../shared/ngxs/user/user.actions";
import {ChangeNameDialogComponent} from "./change-name-dialog/change-name-dialog.component";

@Component({
  selector: 'maorix-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css'],
})
export class CabinetComponent implements OnInit {
  name = '';

  @Select(UserState.getUser) user$: Observable<User>;
  @Select(UserState.getStatus) status$: Observable<DataStatus>;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    public nearAuthService: NearAuthService
  ) {}

  ngOnInit() {
    this.store.dispatch(new LoadUserProfile())
  }

  onCreateUser() {
    if (this.name.trim().length) {
      this.store.dispatch(new AddNewUser(this.name))
    }
  }

  openChangeNameDialog(name: string) {
    this.dialog.open(ChangeNameDialogComponent, {
      width: '250px',
      data: {name},
    });
  }
}
