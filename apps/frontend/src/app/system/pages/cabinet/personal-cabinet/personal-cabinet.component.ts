import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {NearAuthService} from "../../../../auth/core/services/near-auth.service";
import {ChangeNameDialogComponent} from "../change-name-dialog/change-name-dialog.component";
import {UserState} from "../../../../shared/ngxs/user/user.state";
import {Select, Store} from "@ngxs/store";
import {User} from "@maorix-contract/types";
import {AddNewUser, LoadUserProfile} from "../../../../shared/ngxs/user/user.actions";
import {Observable} from "rxjs";
import {DataStatus} from "../../../../shared/types";
import {ContractService} from "../../../../shared/contract/contract.service";

@Component({
  selector: 'maorix-personal-cabinet',
  templateUrl: './personal-cabinet.component.html',
  styleUrls: ['./personal-cabinet.component.css'],
})
export class PersonalCabinetComponent implements OnInit {
  name = '';

  @Select(UserState.getUser) user$: Observable<User>;
  @Select(UserState.getStatus) status$: Observable<DataStatus>;

  constructor(
    private contractService: ContractService,
    private store: Store,
    public dialog: MatDialog,
    public nearAuthService: NearAuthService
  ) {}

  ngOnInit() {
    this.store.dispatch(new LoadUserProfile())
  }

  onCreateUser() {
    this.store.dispatch(new AddNewUser(this.name))
  }

  openChangeNameDialog(name: string) {
    this.dialog.open(ChangeNameDialogComponent, {
      width: '250px',
      data: {name},
    });
  }
}
