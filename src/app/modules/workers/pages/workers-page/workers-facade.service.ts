import {Injectable} from '@angular/core';
import {EmployeeFiltersState} from '../../../../core/models/employee-filters-state';
import {WorkersService} from '../../services/workers.service';
import {WorkersClientService} from '../../clients/workers-client.service';
import { Employee } from 'src/app/core/models/employee';

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

  addWorker(worker: Employee) {
    this.workersClient.post(worker).subscribe(() => {
      this.workersService.add(worker);
    });
  }
  setFilters(filtersState: EmployeeFiltersState) {
    this.workersService.setFilters(filtersState);
  }
}
