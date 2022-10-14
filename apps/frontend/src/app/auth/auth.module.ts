import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NearLoginComponent } from './near-login/near-login.component';
import {MatButtonModule} from "@angular/material/button";
import {AuthRoutingModule} from "./auth-routing.module";

@NgModule({
  declarations: [NearLoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatButtonModule,
  ],
})
export class AuthModule {}
