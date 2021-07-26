import { OnInit, Component, Inject, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import type { Employee } from '../../../../core/models/employee';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-worker-form',
  templateUrl: './worker-form.component.html',
  styleUrls: ['./worker-form.component.scss'],
})
export class WorkerFormComponent implements OnInit {
  formData = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<WorkerFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Employee
  ) {}

  public form = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(null),
    city: new FormControl(''),
  });

  ngOnInit() {
    this.form.patchValue({
      name: this.data.worker.name,
      age: this.data.worker.age,
      city: this.data.worker.city,
    });
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.formData.emit(this.form.value);
    this.dialogRef.close();
  }
}
