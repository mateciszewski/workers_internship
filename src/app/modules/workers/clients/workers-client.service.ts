import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from '../../../core/models/employee';
import { EmployeeEntity } from '../../../core/models/employee-entity';

@Injectable({
  providedIn: 'root'
})
export class WorkersClientService {
  public apiUrl: string = 'http://localhost:4200/employees';

  constructor(private httpClient: HttpClient) { }

  public post(employee: Required<EmployeeEntity>): Observable<Employee> {
    return this.httpClient.post<Required<Employee>>(this.apiUrl, employee);
  }

  public get(): Observable<Employee[]> {
    return this.httpClient.get<Required<Employee>[]>(this.apiUrl);
  }

  public put(employeeId: number, employee: Required<EmployeeEntity>): any {
    return this.httpClient.put<Required<Employee>>(`${this.apiUrl}/${employeeId}`, employee);
  }

  public delete(employeeId: number): Observable<Employee> {
    return this.httpClient.delete<Required<Employee>>(`${this.apiUrl}/${employeeId}`);
  }
}
