import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import type { Employee } from 'src/app/core/models/employee';

@Component({
  selector: 'app-worker-tile',
  templateUrl: './worker-tile.component.html',
  styleUrls: ['./worker-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkerTileComponent {
  @Input() worker: Employee;
  @Output() editedEmployee = new EventEmitter<Employee>();
  @Output() removedEmployee = new EventEmitter<Employee>();

  onEmployeeRemove(worker: Employee) {
    this.removedEmployee.emit(worker);
  }

  onEmployeeEdit(worker: Employee) {
    this.editedEmployee.emit(worker);
  }
}
