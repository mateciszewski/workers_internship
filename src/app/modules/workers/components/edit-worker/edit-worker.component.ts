import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import type { Employee } from 'src/app/core/models/employee';
import { WorkersFacadeService } from '../../pages/workers-page/workers-facade.service';
import { WorkerFormComponent } from '../worker-form/worker-form.component';

@Component({
  selector: 'app-edit-worker',
  templateUrl: './edit-worker.component.html',
  styleUrls: ['./edit-worker.component.scss'],
})
export class EditWorkerComponent {
  constructor(
    public dialog: MatDialog,
    private workersFacade: WorkersFacadeService
  ) {}
  @Input() worker: Employee;

  openDialog(): void {
    const dialogRef = this.dialog.open(WorkerFormComponent, {
      width: '320px',
      data: { worker: this.worker },
    });

    dialogRef.componentInstance.formData.subscribe((value: Employee) => {
      this.workersFacade.editWorker(this.worker.id, value);
    });
  }
}
