import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { EmployeeEntity } from '../../../../core/models/employee-entity';
import { EmployeeFiltersState } from 'src/app/core/models/employee-filters-state';

@Component({
  selector: 'app-workers-table',
  templateUrl: './workers-table.component.html',
  styleUrls: ['./workers-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersTableComponent implements OnChanges {
  public displayedColumns: string[] = ['name', 'age', 'city', 'isWorking', 'actions'];

  @Input() workers: EmployeeEntity[];
  @Input() filters: EmployeeFiltersState;

  @Output() employeeRemoved = new EventEmitter<EmployeeEntity>();
  @Output() employeeEdited = new EventEmitter<EmployeeEntity>();

  public emptyMessage: string;

  public ngOnChanges(changes: SimpleChanges) {
    if(changes.filters?.currentValue !== changes.filters?.previousValue) {
      this.emptyMessage = Object.keys(this.filters).length === 0 ? 'Brak danych.' : 'Nie znaleziono wyników dla podanych kryteriów.';
    }
  }

  public onEditWorkerClick(worker: EmployeeEntity): void {
    this.employeeEdited.emit(worker);
  }

  public onDeleteWorkerClick(worker: EmployeeEntity): void {
    this.employeeRemoved.emit(worker);
  }
}
