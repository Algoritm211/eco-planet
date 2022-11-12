import { Component } from '@angular/core';
import { User } from '@maorix-contract/types';
import {NearAuthService} from "../../../../auth/core/services/near-auth.service";
import {Select} from "@ngxs/store";
import {UserState} from "../../../../shared/ngxs/user/user.state";
import {Observable} from "rxjs";

@Component({
  selector: 'maorix-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {

  @Select(UserState.getUser) user$: Observable<User>;

  constructor(
    public nearAuthService: NearAuthService
  ) {}
}
