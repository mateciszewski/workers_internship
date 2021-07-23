import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Employee } from '../../../../core/models/employee';

@Component({
  selector: 'app-workers-table',
  templateUrl: './workers-table.component.html',
  styleUrls: ['./workers-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersTableComponent {
  public displayedColumns: string[] = ['name', 'age', 'city', 'isWorking', 'actions'];

  @Input() workers: Employee[];

  public onEditWorkerClick(worker: Employee): void { }

  public onDeleteWorkerClick(worker: Employee): void { }
}
