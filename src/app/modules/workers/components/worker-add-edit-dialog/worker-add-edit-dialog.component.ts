import { Component, ChangeDetectionStrategy, Inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Employee } from "src/app/core/models/employee";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeOrigin } from "src/app/core/models/employee-origin";

@Component({
    selector:'app-worker-add-edit-dialog',
    templateUrl: './worker-add-edit-dialog.component.html',
    styleUrls: ['./worker-add-edit-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class WorkerAddEditDialogComponent{
    public titleText: string;
    public addForm: FormGroup;
    public buttonText: string;

    constructor(
        public dialogRef: MatDialogRef<WorkerAddEditDialogComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: Employee | null, 
        private formBuilder: FormBuilder
    ) {
        this.titleText = this.data === null ? 'Dodawanie' : `Edytowanie ${this.data.name}`;
        this.buttonText = this.data === null ? 'Dodaj' : 'Edytuj';

        if(this.data === null) this.data = EmployeeOrigin;

        this.addForm = this.formBuilder.group({
            name: new FormControl(this.data.name, [Validators.required]),
            age: new FormControl(this.data.age, [Validators.required, Validators.min(15), Validators.max(200)]),
            city: new FormControl(this.data.city, [Validators.required]),
            isWorking: new FormControl(this.data.isWorking, [Validators.required])
        });
    }

    public onClick(): void {
        this.dialogRef.close(this.addForm.value);
    }
}