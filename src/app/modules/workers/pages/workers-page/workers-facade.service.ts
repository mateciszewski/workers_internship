import { WorkersFiltersComponent } from './../../components/workers-filters/workers-filters.component';
import { Injectable } from '@angular/core';
import { EmployeeFiltersState } from '../../../../core/models/employee-filters-state';
import { WorkersService } from '../../services/workers.service';
import { WorkersClientService } from '../../clients/workers-client.service';

@Injectable({
  providedIn: 'root'
})
export class WorkersFacadeService {
  list$ = this.workersService.list$;
  filters$ = this.workersService.filters$;

  constructor(private workersService: WorkersService, private workersClient: WorkersClientService) {
  }

  loadWorkers() {
    this.workersClient.get().subscribe((workers) => {
      this.workersService.initialize(workers);
    });
  }

  setFilters(filtersState: EmployeeFiltersState) {
    //debugger
    this.workersService.setFilters(filtersState);
  }
}
