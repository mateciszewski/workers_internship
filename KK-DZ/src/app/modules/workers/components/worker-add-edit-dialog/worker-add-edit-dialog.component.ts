import { Component, ChangeDetectionStrategy, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Employee } from "src/app/core/models/employee";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMPLOYEE_ORIGIN } from "src/app/core/models/employee-origin";

@Component({
    selector:'app-worker-add-edit-dialog',
    templateUrl: './worker-add-edit-dialog.component.html',
    styleUrls: ['./worker-add-edit-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class WorkerAddEditDialogComponent{
    public addForm: FormGroup;
    public titleText: string = "Dodawanie";
    public buttonText: string = "Dodaj";

    constructor(
        public dialogRef: MatDialogRef<WorkerAddEditDialogComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: Employee | null, 
        private formBuilder: FormBuilder
    ) {
        const worker = this.data || EMPLOYEE_ORIGIN;

        if(this.data !== null) {
            this.titleText = `Edytowanie ${worker.name}`;
            this.buttonText = 'Edytuj';
        }

        this.addForm = this.formBuilder.group({
            name: [worker.name, [Validators.required]],
            age: [worker.age, [Validators.required, Validators.min(15), Validators.max(200)]],
            city: [worker.city, [Validators.required]],
            isWorking: [worker.isWorking, [Validators.required]]
        });
    }

    public onClick(): void {
        this.dialogRef.close(this.addForm.value);
    }
}