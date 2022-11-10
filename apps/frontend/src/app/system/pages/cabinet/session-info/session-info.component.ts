import {Component, Input} from '@angular/core';
import {User} from "@maorix-contract/types";

@Component({
  selector: 'maorix-session-info',
  templateUrl: './session-info.component.html',
  styleUrls: ['./session-info.component.css'],
})
export class SessionInfoComponent {

  @Input() user: User

  panelOpenState = false;

  constructor() {}
}
