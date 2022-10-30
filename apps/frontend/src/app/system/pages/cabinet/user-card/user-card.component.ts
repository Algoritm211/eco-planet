import { Component, Input } from '@angular/core';
import { User } from '@maorix-contract/types';
import {NearAuthService} from "../../../../auth/core/services/near-auth.service";

@Component({
  selector: 'maorix-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {

  @Input() user: User;

  constructor(
    public nearAuthService: NearAuthService
  ) {}
}
