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
    const parsedWorker = this.getTruthyValues(worker);
    if (this.isValidWorker(parsedWorker)) {
      this.workersClient.post(worker).subscribe((createdWorker) => {
        this.workersService.add(createdWorker);
      });
    }
  }

  updateWorker(worker: Employee) {
      this.workersClient.put(worker).subscribe(() => {
        this.workersService.update(worker);
      });
  }

  isValidWorker(worker: Partial<Employee>) {
    return Object.keys(worker).length > 0;
  }

  removeWorker(worker: Employee) {
    this.workersClient.delete(worker).subscribe(() => {
      this.workersService.remove(worker);
    });
  }

  getTruthyValues(data: Employee | EmployeeFiltersState | null | undefined) {
    if (data === null || data === undefined) {
      return {};
    }

    const entries = Object.entries(data).filter(
      ([, value]) => value !== undefined && value !== null && value !== '',
    );

    return Object.fromEntries(entries);
  }

  setFilters(filtersState: EmployeeFiltersState) {
    this.workersService.setFilters(filtersState);
  }
}
