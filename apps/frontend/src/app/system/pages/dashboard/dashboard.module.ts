import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UsersTableComponent } from './users-table/users-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { DashboardComponent } from './dashboard.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
  declarations: [
    UsersTableComponent,
    DashboardComponent,
    DashboardHeaderComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
  ],
})
export class DashboardModule {}
