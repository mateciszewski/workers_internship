import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Employee } from '../../../../core/models/employee';
import { WorkersClientService } from '../../clients/workers-client.service';
import { WorkersFacadeService } from '../../pages/workers-page/workers-facade.service';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-worker-tile',
  templateUrl: './worker-tile.component.html',
  styleUrls: ['./worker-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerTileComponent {
  @Input() worker: Employee;

  constructor(private workersclientService: WorkersClientService, private workersFasadeService: WorkersFacadeService) { }

  deleteWorker(id: number) {
    this.workersclientService.delete(id).subscribe();
    this.workersFasadeService.loadWorkers();
  }
}
