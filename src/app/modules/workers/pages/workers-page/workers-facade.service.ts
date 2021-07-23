import { Injectable } from '@angular/core';

import { EmployeeFiltersState } from 'src/app/core/models/employee-filters-state';

import { WorkersService } from '../../services/workers.service';
import { WorkersClientService } from '../../clients/workers-client.service';

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
}
