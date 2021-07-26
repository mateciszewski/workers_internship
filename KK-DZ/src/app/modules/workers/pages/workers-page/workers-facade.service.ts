import { Injectable } from '@angular/core';

import { Employee } from 'src/app/core/models/employee';
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

  public setFilters(filtersState: EmployeeFiltersState): void {
    this.workersService.setFilters(filtersState);
  }

  public add(employee: Employee): void {
    this.workersClient.post(employee).subscribe(worker => {
      this.loadWorkers();
    }, _ => {
      alert('Dodanie pracownika nie powiodło się, sprawdź połączenie z Internetem.');
    });
  }

  public loadWorkers(): void {
    this.workersClient.get().subscribe(workers => {
      this.workersService.initialize(workers);
    }, _ => {
      alert('Wczytanie listy pracowników nie powiodło się, sprawdź połączenie z Internetem.');
    });
  }

  public edit(employeeId: number, employee: Employee): void {
    this.workersClient.put(employeeId, employee).subscribe(worker => {
      this.loadWorkers();
    }, _ => {
      alert('Edycja pracownika nie powiodło się, sprawdź połączenie z Internetem.');
    });
  }

  public delete(worker: EmployeeEntity): void {
    this.workersClient.delete(worker.id).subscribe(_ => {
      this.loadWorkers();
    }, _ => {
      alert('Usunięcie użytkownika nie powiodło się, sprawdź połączenie z Internetem.');
    });
  }
}
