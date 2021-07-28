import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { EmployeeFiltersState } from 'src/app/core/models/employee-filters-state';
import { Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-workers-filters',
  templateUrl: './workers-filters.component.html',
  styleUrls: ['./workers-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkersFiltersComponent implements OnInit, OnDestroy {
  @Input() set state(value: EmployeeFiltersState) {
    this.updateFormInputs(value);
  }

  @Input() autoCompleteNames: string[];
  @Input() autoCompleteCities: string[];

  @Output() changed = new EventEmitter<EmployeeFiltersState>();

  public form: FormGroup;
  private subscriptionFormValueChanges: Subscription;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [],
      age: [
        ,
        [
          Validators.pattern('^[0-9]+$'),
          Validators.min(15),
          Validators.max(200),
        ],
      ],
      city: [],
      isWorking: [],
    });
  }

  public ngOnInit(): void {
    this.subscriptionFormValueChanges = combineLatest([
      this.form.statusChanges,
      this.form.valueChanges,
    ])
      .pipe(map(([status, value]) => (status === 'VALID' ? value : {})))
      .subscribe((value) =>
        this.changed.emit(this.emptyValuesInObjectToNull(value))
      );
  }

  public ngOnDestroy(): void {
    this.subscriptionFormValueChanges.unsubscribe();
  }

  public resetFilters(): void {
    this.form.reset();
  }

  private updateFormInputs(value: EmployeeFiltersState): void {
    this.form.patchValue(
      {
        name: value.name,
        age: value.age,
        city: value.city,
        isWorking: value.isWorking,
      },
      {
        emitEvent: false,
        onlySelf: true,
      }
    );
  }

  private emptyValuesInObjectToNull(value: {}): {} {
    return Object.keys(value).reduce((acc, key) => {
      return { ...acc, [key]: String(value[key]) !== '' ? value[key] : null };
    }, {});
  }
}
