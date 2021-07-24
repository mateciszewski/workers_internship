import { Injectable } from '@angular/core';

import { EmployeeFiltersState } from 'src/app/core/models/employee-filters-state';

import { WorkersService } from '../../services/workers.service';
import { WorkersClientService } from '../../clients/workers-client.service';
import { EmployeeEntity } from 'src/app/core/models/employee-entity';

@Injectable({
  providedIn: 'root'
})
export class WorkersFacadeService {
  public list$ = this.workersService.list$;
  public filters$ = this.workersService.filters$;

  constructor(private workersService: WorkersService, private workersClient: WorkersClientService) { }

  public loadWorkers(): void {
    this.workersClient.get().subscribe((workers) => {
      this.workersService.initialize(workers);
    });
  }

  public setFilters(filtersState: EmployeeFiltersState): void {
    this.workersService.setFilters(filtersState);
  }

  public delete(worker: EmployeeEntity): void {
    this.workersClient.delete(worker.id).subscribe(_ => {
      this.workersService.delete(worker.id);
    });
  }
}
