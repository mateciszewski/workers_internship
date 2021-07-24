import { WorkerAddComponent } from './../worker-add.component';
import { Component } from '@angular/core';
import type { MatDialog } from '@angular/material/dialog';
import type { Employee } from 'src/app/core/models/employee';

@Component({
  selector: 'app-worker-add-button',
  templateUrl: './worker-add-button.component.html',
  styleUrls: ['./worker-add-button.component.scss'],
})
export class WorkerAddButtonComponent {
  public newEmployee: Employee = {
    id: null,
    name: '',
    age: null,
    isWorking: false,
    city: '',
  };

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(WorkerAddComponent, {
      width: '350px',
      data: this.newEmployee,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.newEmployee = result;
    });
  }
}
