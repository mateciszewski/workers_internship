import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EmployeeFiltersState} from '../../../../core/models/employee-filters-state';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-workers-filters',
  templateUrl: './workers-filters.component.html',
  styleUrls: ['./workers-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersFiltersComponent implements OnInit {
  @Input() state: EmployeeFiltersState;
  @Output() changed = new EventEmitter<EmployeeFiltersState>();

  public form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.state.name),
      age: new FormControl(this.state.age),
      city: new FormControl(this.state.city),
      isWorking: new FormControl()
    });

    console.log(this.state);
    this.form.valueChanges.subscribe(value => {
      this.changed.emit(value);
    });
  }
  resetFilters(){
    console.log(this.form.value);
    this.form.reset();
    this.changed.emit({});
  }
}
