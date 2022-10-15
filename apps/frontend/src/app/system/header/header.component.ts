import {Component, EventEmitter, Output} from '@angular/core';
import {NearAuthService} from "../../auth/core/services/near-auth.service";

@Component({
  selector: 'maorix-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  @Output() sideNavToggleEvent = new EventEmitter<void>()

  constructor(public nearAuthService: NearAuthService) {}

  onSideNavToggle() {
    this.sideNavToggleEvent.emit()
  }

  onLogout() {
    this.nearAuthService.logout();
  }
}
