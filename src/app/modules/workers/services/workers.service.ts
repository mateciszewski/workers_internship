import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { Employee } from '../../../core/models/employee';
import { EmployeeFiltersState } from '../../../core/models/employee-filters-state';

@Injectable({
  providedIn: 'root',
})
export class WorkersService {
  private workers$: BehaviorSubject<Employee[]>;
  private filtersSubject$: BehaviorSubject<EmployeeFiltersState> =
    new BehaviorSubject({});

  public list$: Observable<Employee[]>;
  public filters$ = this.filtersSubject$.asObservable().pipe(
    map((filters) =>
      Object.keys(filters).reduce(
        (acc, key) => ({
          ...acc,
          ...(!!filters[key] ? { [key]: filters[key] } : {}),
        }),
        {}
      )
    )
  );

  constructor() {
    this.workers$ = new BehaviorSubject([]);

    this.list$ = combineLatest([this.workers$, this.filters$]).pipe(
      map(([workers, filters]) =>
        workers.filter((worker: Employee) =>
          this.checkWorkerIsValid(worker, filters)
        )
      )
    );
  }

  private checkWorkerIsValid(
    worker: Employee,
    filters: Partial<Employee>
  ): boolean {
    return Object.keys(filters).every(
      (key: string) =>
        `${filters[key]}`.toLowerCase() === `${worker[key]}`.toLowerCase()
    );
  }

  public initialize(workers: Employee[]) {
    this.workers$.next(workers);
  }

  public add(worker: Employee): void {
    this.workers$.next([...this.workers$.value, worker]);
  }

  public edit(id: number, worker: Employee): void {
    const index = this.workers$.value.findIndex(
      (worker: Employee) => worker.id === id
    );
    let editedWorkers = this.workers$.value;
    editedWorkers[index] = worker;
    this.workers$.next(editedWorkers);
  }

  delete(id: number) {
    let filteredWorkers = this.workers$.value.filter(
      (worker: Employee) => worker.id !== id
    );
    this.workers$.next(filteredWorkers);
  }

  public setFilters(filter: Partial<Employee> = {}): void {
    this.filtersSubject$.next(filter);
  }
}
