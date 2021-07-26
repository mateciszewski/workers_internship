import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WorkerFormComponent } from '../worker-form/worker-form.component';
import type { Employee } from '../../../../core/models/employee';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddWorkerComponent {
  @Output() worker = new EventEmitter<Employee>();

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(WorkerFormComponent, {
      width: '320px',
      data: { worker: { name: '', age: null, city: '' } },
    });

    dialogRef.componentInstance.formData.subscribe((value: Employee) => {
      this.worker.emit(value);
    });
  }
}
