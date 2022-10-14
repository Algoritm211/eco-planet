import { Component } from '@angular/core';
import {NearAuthService} from "../../auth/core/services/near-auth.service";

@Component({
  selector: 'maorix-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(public nearAuthService: NearAuthService) {}

  onLogout() {
    this.nearAuthService.logout();
  }
}
