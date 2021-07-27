import { Injectable } from '@angular/core';
import { EmployeeEntity } from '../../../core/models/employee-entity';
import { EmployeeFiltersState } from '../../../core/models/employee-filters-state';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WorkersService {
  private workers$: BehaviorSubject<EmployeeEntity[]>;
  private filtersSubject$: BehaviorSubject<EmployeeFiltersState> =
    new BehaviorSubject({});

  public list$: Observable<EmployeeEntity[]>;
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

  public autoCompleteNames$: Observable<string[]>;
  public autoCompleteCities$: Observable<string[]>;

  constructor() {
    this.workers$ = new BehaviorSubject([]);

    this.list$ = combineLatest([this.workers$, this.filters$]).pipe(
      map(([workers, filters]) =>
        workers.filter((worker: EmployeeEntity) =>
          this.checkWorkerIsValid(worker, filters)
        )
      )
    );

    this.autoCompleteNames$ = this.autoCompleteValue('name');
    this.autoCompleteCities$ = this.autoCompleteValue('city');
  }

  private checkWorkerIsValid(
    worker: EmployeeEntity,
    filters: EmployeeFiltersState
  ): boolean {
    return Object.keys(filters).every((key: string) =>
      !isNaN(filters[key])
        ? Number(filters[key]) === Number(worker[key])
        : `${worker[key]}`
            .toLowerCase()
            .startsWith(`${filters[key]}`.toLowerCase())
    );
  }

  public initialize(workers: EmployeeEntity[]) {
    this.workers$.next(workers);
  }

  public add(worker: EmployeeEntity): void {
    this.workers$.next([...this.workers$.value, worker]);
  }

  public edit(workerId: number, worker: EmployeeEntity) {
    const editedWorkers = [...this.workers$.value];

    const index = editedWorkers.findIndex((item) => item.id === workerId);
    editedWorkers[index] = worker;

    this.workers$.next(editedWorkers);
  }

  public delete(workerId: number): void {
    this.workers$.next(this.removeWorkersWithId(workerId));
  }

  public setFilters(filter: EmployeeFiltersState = {}): void {
    this.filtersSubject$.next(filter);
  }

  private removeWorkersWithId(workerId: number): EmployeeEntity[] {
    return this.workers$.value.filter((worker) => worker.id !== workerId);
  }

  private autoCompleteValue(key: string): Observable<string[]> {
    return this.list$.pipe(
      map((workers: EmployeeEntity[]) =>
        this.uniqueValueFromWorkers(workers, key)
      ),
      distinctUntilChanged()
    );
  }

  private uniqueValueFromWorkers(
    workers: EmployeeEntity[],
    key: string
  ): any[] {
    return [...new Set(workers.map((worker: EmployeeEntity) => worker[key]))];
  }
}
