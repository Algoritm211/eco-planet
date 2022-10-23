import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface ChangeNameDialogData {
  name: string;
}

@Component({
  selector: 'maorix-change-name-dialog',
  templateUrl: './change-name-dialog.component.html',
  styleUrls: ['./change-name-dialog.component.css'],
})
export class ChangeNameDialogComponent {
  name = '';

  constructor(
    public dialogRef: MatDialogRef<ChangeNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChangeNameDialogData,
  ) {}

  onSubmit() {
    //TODO make submit with eco-contract methods
    console.log(this.name)
  }

  onCancel() {
    this.dialogRef.close()
  }
}
