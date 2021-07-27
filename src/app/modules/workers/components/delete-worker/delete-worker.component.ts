import { Component, Input } from '@angular/core';
import { WorkersFacadeService } from '../../pages/workers-page/workers-facade.service';

@Component({
  selector: 'app-delete-worker',
  templateUrl: './delete-worker.component.html',
  styleUrls: ['./delete-worker.component.scss'],
})
export class DeleteWorkerComponent {
  @Input() id: number;
  constructor(private workersFacade: WorkersFacadeService) {}

  onSubmit() {
    this.workersFacade.deleteWorker(this.id);
  }
}
