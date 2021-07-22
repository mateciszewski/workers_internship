import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EmployeeFiltersState} from '../../../../core/models/employee-filters-state';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-workers-filters',
  templateUrl: './workers-filters.component.html',
  styleUrls: ['./workers-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersFiltersComponent implements OnInit {
  @Input() state: EmployeeFiltersState;
  @Output() changed = new EventEmitter<EmployeeFiltersState>();

  public form = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(null),
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe(value => {
      this.changed.emit(value);
    });
  }
}
