import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { EmployeeFiltersState } from 'src/app/core/models/employee-filters-state';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workers-filters',
  templateUrl: './workers-filters.component.html',
  styleUrls: ['./workers-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersFiltersComponent implements OnInit, OnDestroy {
  @Input() state: EmployeeFiltersState;
  @Output() changed = new EventEmitter<EmployeeFiltersState>();

  public form: FormGroup;
  private subscriptionFormValueChanges: Subscription;

  public ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.state.name),
      age: new FormControl(this.state.age, [Validators.pattern('^[0-9]+$'), Validators.min(15), Validators.max(200)]),
      city: new FormControl(this.state.city),
      isWorking: new FormControl(["true", "false"].includes(String(this.state.isWorking)) ? String(this.state.isWorking) : null)
    });

    this.subscriptionFormValueChanges = this.form.valueChanges.subscribe(value => {
      const newValue = Object.keys(value).reduce((acc, key) => {
        return {...acc, [key]: value[key] !== "" ? value[key] : null}
      }, {});
      this.changed.emit(newValue);
    });
  }

  public ngOnDestroy(): void {
    this.subscriptionFormValueChanges.unsubscribe();
  }

  public resetFilters(): void {
    this.form.reset();
  }
}
