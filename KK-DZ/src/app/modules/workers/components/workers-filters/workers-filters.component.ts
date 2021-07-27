import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';

import { EmployeeFiltersState } from 'src/app/core/models/employee-filters-state';

import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-workers-filters',
  templateUrl: './workers-filters.component.html',
  styleUrls: ['./workers-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersFiltersComponent implements OnInit, OnChanges, OnDestroy {
  @Input() state: EmployeeFiltersState;
  @Output() changed = new EventEmitter<EmployeeFiltersState>();

  @Input() autoCompleteNames: string[];
  @Input() autoCompleteCities: string[];

  public form: FormGroup;
  private subscriptionFormValueChanges: Subscription;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [],
      age: [, [Validators.pattern('^[0-9]+$'), Validators.min(15), Validators.max(200)]],
      city: [],
      isWorking: []
    });
  }

  public ngOnInit(): void {
    this.subscriptionFormValueChanges = this.form.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged()
    ).subscribe(value => {
      const newValue = Object.keys(value).reduce((acc, key) => {
        return {...acc, [key]: value[key] !== "" ? value[key] : null}
      }, {});
      this.changed.emit(newValue);
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if(changes.state?.currentValue !== changes.state?.previousValue) {
      this.form.patchValue({
        name: this.state.name,
        age: this.transformAgeFormControl(Number(this.state.age)),
        city: this.state.city,
        isWorking: this.transformIsWorkingFormControl(String(this.state.isWorking))
      }, {
        emitEvent: false,
        onlySelf: true
      });
    }
  }

  public ngOnDestroy(): void {
    this.subscriptionFormValueChanges.unsubscribe();
  }

  public resetFilters(): void {
    this.form.reset();
  }

  private transformAgeFormControl(input: number): number | null {
    return !isNaN(input) ? Number(input) : null;
  }

  private transformIsWorkingFormControl(input: string): boolean | null {
    return ["true", "false"].includes(input) ? input === "true" : null;
  }
}
