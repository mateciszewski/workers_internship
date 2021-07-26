import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeEntity } from 'src/app/core/models/employee-entity';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: 'delete-confirmation-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteConfirmationDialogComponent {
  constructor(
      @Inject(MAT_DIALOG_DATA) public worker: EmployeeEntity
  ) { }
}
