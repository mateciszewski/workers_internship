import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import type { MatDialogRef } from '@angular/material/dialog';
import type { Employee } from 'src/app/core/models/employee';

@Component({
  selector: 'app-worker-form',
  templateUrl: './worker-form.component.html',
  styleUrls: ['./worker-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkerFormComponent {
  public buttonText = 'Dodaj';
  public workerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<WorkerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee | null,
  ) {
    if (data !== null) {
      this.buttonText = 'Edytuj';
    }

    this.workerForm = new FormGroup({
      name: new FormControl(this.data?.name || '', [Validators.required]),
      isWorking: new FormControl(this.data?.isWorking, [Validators.required]),
      age: new FormControl(this.data?.age, [Validators.required]),
      city: new FormControl(this.data?.city || '', [Validators.required]),
    });
  }

  public onClick() {
    this.dialogRef.close(this.workerForm.value);
  }
}
