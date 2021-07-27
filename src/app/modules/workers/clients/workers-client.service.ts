import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { Employee } from '../../../core/models/employee';

@Injectable({
  providedIn: 'root',
})
export class WorkersClientService {
  CLIENT_URL: string = 'http://localhost:3000/workers/';
  constructor(private httpClient: HttpClient) {}

  get(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.CLIENT_URL);
  }

  add(Employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.CLIENT_URL, Employee);
  }

  edit(id: number, Employee: Employee) {
    return this.httpClient.put<Employee>(this.CLIENT_URL + id, Employee);
  }

  delete(id: number) {
    return this.httpClient.delete<Employee>(this.CLIENT_URL + id);
  }
}
