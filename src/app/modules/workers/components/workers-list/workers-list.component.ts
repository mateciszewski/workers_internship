import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import type { Employee } from '../../../../core/models/employee';

@Component({
  selector: 'app-workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkersListComponent {
  @Input() workers: Employee[];
  @Output() editedEmployee = new EventEmitter<Employee>();
  @Output() removedEmployee = new EventEmitter<Employee>();

  public onEmployeeRemove(worker: Employee) {
    this.removedEmployee.emit(worker);
  }

  public onEmployeeEdit(worker: Employee) {
    this.editedEmployee.emit(worker);
  }
}
