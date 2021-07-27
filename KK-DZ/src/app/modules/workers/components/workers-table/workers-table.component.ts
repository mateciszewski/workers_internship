import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { EmployeeEntity } from '../../../../core/models/employee-entity';
import { EmployeeFiltersState } from 'src/app/core/models/employee-filters-state';

@Component({
  selector: 'app-workers-table',
  templateUrl: './workers-table.component.html',
  styleUrls: ['./workers-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkersTableComponent {
  public displayedColumns: string[] = [
    'name',
    'age',
    'city',
    'isWorking',
    'actions',
  ];

  @Input() workers: EmployeeEntity[];
  @Input() filters: EmployeeFiltersState;

  @Output() employeeRemoved = new EventEmitter<EmployeeEntity>();
  @Output() employeeEdited = new EventEmitter<EmployeeEntity>();

  public onEditWorkerClick(worker: EmployeeEntity): void {
    this.employeeEdited.emit(worker);
  }

  public onDeleteWorkerClick(worker: EmployeeEntity): void {
    this.employeeRemoved.emit(worker);
  }
}
