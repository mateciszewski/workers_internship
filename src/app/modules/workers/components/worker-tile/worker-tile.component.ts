import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { Employee } from '../../../../core/models/employee';
import type { WorkersFacadeService } from '../../pages/workers-page/workers-facade.service';

@Component({
  selector: 'app-worker-tile',
  templateUrl: './worker-tile.component.html',
  styleUrls: ['./worker-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkerTileComponent {
  @Input() worker: Employee;

  constructor(private fasadeService: WorkersFacadeService) {}

  removeEmployee(worker: Employee) {
    this.fasadeService.removeWorker(worker);
  }
}
