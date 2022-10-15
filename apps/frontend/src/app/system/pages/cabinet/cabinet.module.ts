import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalCabinetComponent } from './personal-cabinet/personal-cabinet.component';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { UsersDashboardComponent } from '../dashboard/users-dashboard/users-dashboard.component';

@NgModule({
  declarations: [PersonalCabinetComponent, UsersDashboardComponent],
  imports: [CommonModule, CabinetRoutingModule],
})
export class CabinetModule {}
