import {Component} from '@angular/core';
import {NearAuthService} from "../core/services/near-auth.service";

@Component({
  selector: 'maorix-near-login',
  templateUrl: './near-login.component.html',
  styleUrls: ['./near-login.component.css'],
})
export class NearLoginComponent {

  constructor(
    public nearAuthLogin: NearAuthService
  ) {}

  handleLogin = () => {
    this.nearAuthLogin.login();
  };
}
