import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {NearAuthService} from "../../../../auth/core/services/near-auth.service";
import {ChangeNameDialogComponent} from "../change-name-dialog/change-name-dialog.component";

@Component({
  selector: 'maorix-personal-cabinet',
  templateUrl: './personal-cabinet.component.html',
  styleUrls: ['./personal-cabinet.component.css'],
})
export class PersonalCabinetComponent {
  //TODO mock data, we need to use real data
  infoList = [
    {icon: 'person_outline', propName: 'Name', propValue: 'Alexey'},
    {icon: 'local_florist', propName: 'Contributed', propValue: '10'},
    {icon: 'money_bag', propName: 'Your award', propValue: '4.67 NEAR'},
  ]
  constructor(
    public dialog: MatDialog,
    public nearAuthService: NearAuthService
  ) {}

  openChangeNameDialog() {
    this.dialog.open(ChangeNameDialogComponent, {
      width: '250px',
      data: {name: this.infoList[1].propValue},
    });
  }
}
