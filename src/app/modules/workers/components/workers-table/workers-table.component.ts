import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../../../../core/models/employee';
import { EmployeeFiltersState } from 'src/app/core/models/employee-filters-state';

@Component({
  selector: 'app-workers-table',
  templateUrl: './workers-table.component.html',
  styleUrls: ['./workers-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersTableComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'age', 'city', 'isWorking', 'actions'];

  @Input() workers: Employee[];
  @Input() filters: EmployeeFiltersState;

  @Output() removedEmployee = new EventEmitter<Employee>();
  @Output() editedEmployee = new EventEmitter<Employee>();

  public emptyMessage$: Observable<string>;

  public ngOnInit(): void {
    this.emptyMessage$ = of(this.filters).pipe(
      map(filters => {
        return Object.keys(filters).length === 0 ? 'Brak danych.' : 'Nie znaleziono wyników dla podanych kryteriów.';
      })
    );
  }

  public onEditWorkerClick(worker: Employee): void {
    this.editedEmployee.emit(worker);
  }

  public onDeleteWorkerClick(worker: Employee): void {
    this.removedEmployee.emit(worker);
  }
}
