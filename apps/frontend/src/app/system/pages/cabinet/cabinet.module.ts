import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChangeNameDialogComponent } from './change-name-dialog/change-name-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserCardComponent } from './user-card/user-card.component';
import { SessionInfoComponent } from './session-info/session-info.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NewSeasonTimerComponent } from './new-season-timer/new-season-timer.component';
import { CabinetComponent } from './cabinet.component';

@NgModule({
  declarations: [
    ChangeNameDialogComponent,
    UserCardComponent,
    SessionInfoComponent,
    NewSeasonTimerComponent,
    CabinetComponent,
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
  ],
})
export class CabinetModule {}
