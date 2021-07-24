import { Injectable } from '@angular/core';
import type { HttpClient } from '@angular/common/http';
import type { Employee } from '../../../core/models/employee';

@Injectable({
  providedIn: 'root',
})
export class WorkersClientService {
  constructor(private httpClient: HttpClient) {}

  get() {
    return this.httpClient.get<Employee[]>('http://localhost:3000/workers');
  }

  post(worker: Employee) {
    return this.httpClient.post<Employee>('http://localhost:3000/workers', { ...worker });
  }

  delete(worker: Employee) {
    return this.httpClient.delete<Employee>('http://localhost:3000/workers/' + worker.id);
  }
}
