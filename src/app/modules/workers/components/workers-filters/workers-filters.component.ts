import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { EmployeeFiltersState } from 'src/app/core/models/employee-filters-state';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workers-filters',
  templateUrl: './workers-filters.component.html',
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
      age: new FormControl(this.state.age, [Validators.min(15), Validators.max(200)]),
      city: new FormControl(this.state.city),
      isWorking: new FormControl(this.state.isWorking)
    });

    this.subscriptionFormValueChanges = this.form.valueChanges.subscribe(value => {
      this.changed.emit(value);
    });
  }

  public ngOnDestroy(): void {
    this.subscriptionFormValueChanges.unsubscribe();
  }
}
