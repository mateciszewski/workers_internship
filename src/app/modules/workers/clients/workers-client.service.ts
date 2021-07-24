import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EmployeeEntity } from '../../../core/models/employee-entity';
import { Employee } from '../../../core/models/employee';

@Injectable({
  providedIn: 'root'
})
export class WorkersClientService {
  public apiUrl: string = 'http://localhost:4200/employees';

  constructor(private httpClient: HttpClient) { }

  public post(employee: Employee): Observable<EmployeeEntity> {
    return this.httpClient.post<EmployeeEntity>(this.apiUrl, employee);
  }

  public get(): Observable<EmployeeEntity[]> {
    return this.httpClient.get<EmployeeEntity[]>(this.apiUrl);
  }

  public put(employeeId: number, employee: Employee): Observable<EmployeeEntity> {
    return this.httpClient.put<EmployeeEntity>(`${this.apiUrl}/${employeeId}`, employee);
  }

  public delete(employeeId: number): Observable<EmployeeEntity> {
    return this.httpClient.delete<EmployeeEntity>(`${this.apiUrl}/${employeeId}`);
  }
}
