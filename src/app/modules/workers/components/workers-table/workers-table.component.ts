import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeEntity } from '../../../../core/models/employee-entity';
import { EmployeeFiltersState } from 'src/app/core/models/employee-filters-state';

@Component({
  selector: 'app-workers-table',
  templateUrl: './workers-table.component.html',
  styleUrls: ['./workers-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersTableComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'age', 'city', 'isWorking', 'actions'];

  @Input() workers: EmployeeEntity[];
  @Input() filters: EmployeeFiltersState;

  @Output() removedEmployee = new EventEmitter<EmployeeEntity>();
  @Output() editedEmployee = new EventEmitter<EmployeeEntity>();

  public emptyMessage$: Observable<string>;

  public ngOnInit(): void {
    this.emptyMessage$ = of(this.filters).pipe(
      map(filters => {
        return Object.keys(filters).length === 0 ? 'Brak danych.' : 'Nie znaleziono wyników dla podanych kryteriów.';
      })
    );
  }

  public onEditWorkerClick(worker: EmployeeEntity): void {
    this.editedEmployee.emit(worker);
  }

  public onDeleteWorkerClick(worker: EmployeeEntity): void {
    this.removedEmployee.emit(worker);
  }
}
