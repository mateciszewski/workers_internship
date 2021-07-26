import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import type { Employee } from '../../../core/models/employee';

@Injectable({
  providedIn: 'root',
})
export class WorkersClientService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>('http://localhost:3000/workers');
  }

  add(Employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(
      'http://localhost:3000/workers',
      Employee
    );
  }

  edit(id: number, Employee: Employee) {
    return this.httpClient.put<Employee>(
      'http://localhost:3000/workers/' + id,
      Employee
    );
  }

  delete(id: number) {
    this.httpClient.delete<Employee>('http://localhost:3000/workers/' + id);
  }
}
