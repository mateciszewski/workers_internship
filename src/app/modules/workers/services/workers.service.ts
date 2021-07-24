import { Injectable } from '@angular/core';

import { Employee } from '../../../core/models/employee';
import { EmployeeFiltersState } from '../../../core/models/employee-filters-state';

import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {
  private workers$: BehaviorSubject<Employee[]>;
  private filtersSubject$: BehaviorSubject<EmployeeFiltersState> = new BehaviorSubject({});

  public list$: Observable<Employee[]>;
  public filters$ = this.filtersSubject$.asObservable()
    .pipe(map(filters => Object.keys(filters).reduce((acc, key) => ({
      ...acc,
      ...(!!filters[key] ? {[key]: filters[key]} : {})
    }), {})));

  constructor() {
    this.workers$ = new BehaviorSubject([]);

    this.list$ = combineLatest([this.workers$, this.filters$]).pipe(
      map(([workers, filters]) =>
        workers.filter((worker: Employee) => this.checkWorkerIsValid(worker, filters)
        )
      )
    );
  }

  private checkWorkerIsValid(
    worker: Employee,
    filters: EmployeeFiltersState
  ): boolean {
    // return Object.keys(filters).every(
    //   (key: string) => `${filters[key]}`.toLowerCase() === `${worker[key]}`.toLowerCase()
    // );

    return Object.keys(filters).every(
      (key: string) => !isNaN(filters[key]) ?
        Number(filters[key]) === Number(worker[key]) : `${worker[key]}`.toLowerCase().startsWith(`${filters[key]}`.toLowerCase()) 
    );
  }

  public initialize(workers: Employee[]) {
    this.workers$.next(workers);
  }

  public add(worker: Employee): void {
    this.workers$.next([...this.workers$.value, worker]);
  }

  public edit(workerId: number, worker: Employee) {
    this.workers$.next([...this.removeWorkersWithId(workerId), worker]);
  }

  public delete(workerId: number): void {
    this.workers$.next(this.removeWorkersWithId(workerId));
  }

  public setFilters(filter: EmployeeFiltersState = {}): void {
    this.filtersSubject$.next(filter);
  }

  private removeWorkersWithId(workerId: number): Employee[] {
    return this.workers$.value.filter(worker => worker.id !== workerId);
  }
}
