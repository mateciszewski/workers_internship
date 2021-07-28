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
          ...(filters[key] !== '' ? { [key]: filters[key] } : {}),
        }),
        {}
      )
    ),
    distinctUntilChanged()
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
      ),
      distinctUntilChanged()
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

  public setFilters(filter: EmployeeFiltersState = {}): void {
    this.filtersSubject$.next(this.parseFilters(filter));
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

  private parseFilters(filter: EmployeeFiltersState): EmployeeFiltersState {
    const { age, isWorking, ...parsedFilters } = filter;

    if (this.isAgeValid(filter)) parsedFilters.age = Number(filter.age);

    if (this.isWorkingValid(filter))
      parsedFilters.isWorking = String(filter.isWorking) === 'true';

    return parsedFilters;
  }

  private isAgeValid(filter: EmployeeFiltersState): boolean {
    return (
      'age' in filter &&
      !isNaN(filter.age) &&
      filter.age >= 15 &&
      filter.age <= 200
    );
  }

  private isWorkingValid(filter: EmployeeFiltersState): boolean {
    return (
      'isWorking' in filter &&
      typeof filter.isWorking === 'string' &&
      ['true', 'false'].includes(filter.isWorking)
    );
  }
}
