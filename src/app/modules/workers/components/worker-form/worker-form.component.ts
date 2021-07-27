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

    const { name, isWorking, age, city } = data || {};

    this.workerForm = new FormGroup({
      name: new FormControl(name || '', [Validators.required]),
      isWorking: new FormControl(isWorking, [Validators.required]),
      age: new FormControl(age, [Validators.required]),
      city: new FormControl(city || '', [Validators.required]),
    });
  }

  public onClick() {
    this.dialogRef.close(this.workerForm.value);
  }
}
