import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalCabinetComponent } from './personal-cabinet/personal-cabinet.component';
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

@NgModule({
  declarations: [
    PersonalCabinetComponent,
    ChangeNameDialogComponent,
    UserCardComponent,
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
  ],
})
export class CabinetModule {}
