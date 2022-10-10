import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NearLoginComponent } from './near-login/near-login.component';
import {NearRoutingModule} from "./auth-routing.module";

@NgModule({
  declarations: [NearLoginComponent],
  imports: [CommonModule, NearRoutingModule],
})
export class AuthModule {}
