import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/core/models/employee';

@Component({
  selector: 'delete-confirmation-dialog',
  templateUrl: 'delete-confirmation-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteConfirmationDialog {
  constructor(
      public dialogRef: MatDialogRef<DeleteConfirmationDialog>, 
      @Inject(MAT_DIALOG_DATA) public worker: Employee
  ) { }
}
