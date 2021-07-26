import { FormControl, FormGroup } from '@angular/forms';
import { EventEmitter, ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import type { OnInit } from '@angular/core';
import type { EmployeeFiltersState } from 'src/app/core/models/employee-filters-state';

@Component({
  selector: 'app-workers-filters',
  templateUrl: './workers-filters.component.html',
  styleUrls: ['./workers-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkersFiltersComponent implements OnInit {
  @Input() state: EmployeeFiltersState;
  @Output() changed = new EventEmitter<EmployeeFiltersState>();

  public form = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(null),
    city: new FormControl(''),
  });

  ngOnInit() {
    this.form.valueChanges.subscribe((value) => {
      this.changed.emit(value);
    });
    this.form.setValue({
      name: this.state.name || '',
      age: this.state.age || null,
      city: this.state.city || '',
    });
  }
}
