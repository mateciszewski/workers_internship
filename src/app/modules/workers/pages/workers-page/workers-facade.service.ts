import { Injectable } from '@angular/core';
import { EmployeeFiltersState } from '../../../../core/models/employee-filters-state';
import { WorkersService } from '../../services/workers.service';
import { WorkersClientService } from '../../clients/workers-client.service';
import type { Employee } from '../../../../core/models/employee';

@Injectable({
  providedIn: 'root',
})
export class WorkersFacadeService {
  list$ = this.workersService.list$;
  filters$ = this.workersService.filters$;

  constructor(
    private workersService: WorkersService,
    private workersClient: WorkersClientService
  ) {}

  loadWorkers() {
    this.workersClient.get().subscribe((workers) => {
      this.workersService.initialize(workers);
    });
  }

  addWorker(employee: Employee) {
    this.workersClient.add(employee).subscribe((resEmployee) => {
      this.workersService.add(resEmployee);
    });
  }

  editWorker(id: number, employee: Employee) {
    this.workersClient.edit(id, employee).subscribe((res) => {
      this.workersService.edit(res.id, res);
    });
  }

  setFilters(filtersState: EmployeeFiltersState) {
    this.workersService.setFilters(filtersState);
  }
}
