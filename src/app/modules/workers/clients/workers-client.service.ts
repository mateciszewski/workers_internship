import { Employee } from './../../../core/models/employee';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
  },
];

@Injectable({
  providedIn: 'root'
})
export class WorkersClientService {
  constructor(private httpClient: HttpClient) {
  }

  get(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>('http://localhost:3000/workers')
      .pipe(
        catchError(() => of(WORKERS_MOCK))
      );
  }

  add(name: string, age: number, isWorking: boolean, city: string) {
    return this.httpClient.post<Employee>('http://localhost:3000/workers', {
      name: name,
      isWorking: isWorking,
      city: city,
      age: age
    });
  }

  delete(id: number) {
    return this.httpClient.delete<Employee>('http://localhost:3000/workers/' + id);
  }

  put(id: number, name?: string, age?: number, isWorking?: boolean, city?: string) {
    this.httpClient.put<Employee>('http://localhost:3000/workers/' + id, {

    }).subscribe();
  }

  // get(): Observable<Employee[]> {
  //   this.httpClient.post<Employee>('http://localhost:3000/workers', {
  //     name: '123',
  //     isWorking: true,
  //     city: '',
  //     age: 22
  //   }).subscribe();
  //   this.httpClient.delete<Employee>('http://localhost:3000/workers/1').subscribe();
  //   this.httpClient.put<Employee>('http://localhost:3000/workers/1', {
  //   city: '123',
  //   name: '321',
  //   age: 123,
  //   isWorking: false
  //       }).subscribe();
  //   return this.httpClient.get<Employee[]>('http://localhost:3000/workers')
  //     .pipe(
  //       catchError(() => of(WORKERS_MOCK))
  //     );
  // }
}


