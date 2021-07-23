import { Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter} from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { EmployeeEntity } from "src/app/core/models/employee-entity";

@Component({
    selector:'app-worker-add-edit-dialog',
    templateUrl: './worker-add-edit-dialog.component.html',
    styleUrls: ['./worker-add-edit-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class WorkerAddEditDialogComponent implements OnInit{
    @Input() state: EmployeeEntity;
    @Output() changed = new EventEmitter<EmployeeEntity>();

    public addForm=this.formBuilder.group({
        name: new FormControl('', [Validators.required]),
        age: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.min(15), Validators.max(200)]),
        city: new FormControl('', [Validators.required]),
        isWorking: new FormControl('', [Validators.required])
    });

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.addForm.valueChanges.subscribe(value =>{
            this.changed.emit(value);
        });
    }

    public add(){

    }

    public cancel(){

    }
}