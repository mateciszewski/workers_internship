import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Employee} from '../../../core/models/employee';
import {catchError} from 'rxjs/operators';

const WORKERS_MOCK: Employee[] = [
  {
    name: 'Dawid',
    isWorking: true,
    age: 22,
    city: 'Olsztyn'
  },
  {
    name: 'Kamil',
    isWorking: true,
    age: 24,
    city: 'Poznan'
  },
  {
    name: 'Blazej',
    isWorking: false,
    age: 24,
    city: 'Warszawa'
  },
  {
    name: 'Patryk',
    isWorking: false,
    age: 30,
    city: 'Olsztyn'
  },
  {
    name: 'Konrad',
    isWorking: true,
    age: 22,
    city: 'Olsztyn'
  }
];

@Injectable({
  providedIn: 'root'
})
export class WorkersClientService {
  constructor(private httpClient: HttpClient) {
  }

  get(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>('http://localhost:4200/workers')
      .pipe(
        catchError(() => of(WORKERS_MOCK))
      );
  }
}


