import {Component, OnInit} from '@angular/core';
import {NearLoginService} from "./auth/core/services/near-login.service";

@Component({
  selector: 'maorix-contract-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(public nearAuthLogin: NearLoginService) {
  }

  ngOnInit() {
    this.nearAuthLogin.getWallet().subscribe()
  }
}
