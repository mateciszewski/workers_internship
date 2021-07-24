import { Injectable } from '@angular/core';
import type { EmployeeFiltersState } from '../../../../core/models/employee-filters-state';
import type { WorkersService } from '../../services/workers.service';
import type { WorkersClientService } from '../../clients/workers-client.service';
import type { Employee } from 'src/app/core/models/employee';
import type { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class WorkersFacadeService {
  public list$: Observable<Employee[]>;
  public filters$: Observable<EmployeeFiltersState>;

  constructor(private workersService: WorkersService, private workersClient: WorkersClientService) {
    this.list$ = this.workersService.list$;
    this.filters$ = this.workersService.filters$;
  }

  loadWorkers() {
    this.workersClient.get().subscribe((workers) => {
      this.workersService.initialize(workers);
    });
  }

  addWorker(worker: Employee) {
    this.workersClient.post(worker).subscribe(() => {
      this.workersService.add(worker);
    });
  }

  removeWorker(worker: Employee) {
    this.workersClient.delete(worker).subscribe(() => {
      this.workersService.remove(worker);
    });
  }

  parseFilterState(filtersState: EmployeeFiltersState) {
    const entries = Object.entries(filtersState).filter(
      ([, value]) => value !== undefined && value !== null && value !== '',
    );
    return Object.fromEntries(entries);
  }

  setFilters(filtersState: EmployeeFiltersState) {
    this.workersService.setFilters(filtersState);
  }
}
