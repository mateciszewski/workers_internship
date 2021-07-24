import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import type { Observable } from 'rxjs/internal/Observable';
import type { Employee } from '../../../core/models/employee';
import type { EmployeeFiltersState } from '../../../core/models/employee-filters-state';

@Injectable({
  providedIn: 'root',
})
export class WorkersService {
  private workers$: BehaviorSubject<Employee[]>;
  private filtersSubject$: BehaviorSubject<EmployeeFiltersState> = new BehaviorSubject({});

  public list$: Observable<Employee[]>;
  public filters$ = this.filtersSubject$.asObservable().pipe(
    map(
      (filters) =>
        Object.keys(filters).reduce(
          (acc, key) => ({
            ...acc,
            ...(!!filters[key] ? { [key]: filters[key] } : {}),
          }),
          {},
        ) as EmployeeFiltersState,
    ),
  );

  constructor() {
    this.workers$ = new BehaviorSubject([]);

    this.list$ = combineLatest([this.workers$, this.filters$]).pipe(
      map(([workers, filters]) =>
        workers.filter((worker) => this.checkWorkerIsValid(worker, filters)),
      ),
    );
  }

  private checkWorkerIsValid(worker: Employee, filters: Partial<Employee>) {
    return Object.keys(filters).every((key: keyof Employee) => {
      const workerValue = worker[key];
      const filter = String(filters[key]).toLowerCase();
      const valueToSearch = String(workerValue).toLowerCase();

      if (typeof workerValue === 'number') {
        return valueToSearch === filter;
      }
      return valueToSearch.includes(filter);
    });
  }

  public initialize(workers: Employee[]) {
    this.workers$.next(workers);
  }

  public add(worker: Employee) {
    this.workers$.next([...this.workers$.value, worker]);
  }

  public remove(worker: Employee) {
    const workers = this.workers$.value.filter(({ id }) => worker.id !== id);
    this.workers$.next(workers);
  }

  public setFilters(filter: Partial<Employee> = {}) {
    this.filtersSubject$.next(filter);
  }
}
