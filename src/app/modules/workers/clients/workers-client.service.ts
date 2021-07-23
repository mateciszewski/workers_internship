import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../../core/models/employee';

@Injectable({
  providedIn: 'root'
})
export class WorkersClientService {
  public apiUrl: string = 'http://localhost:4200/employees';

  constructor(private httpClient: HttpClient) { }

  public post(employee: Omit<Employee, 'id'>): Observable<Employee> {
    return this.httpClient.post<Employee>(this.apiUrl, employee);
  }

  public get(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.apiUrl);
  }

  public put(employeeId: number, employee: Omit<Employee, 'id'>): any {
    return this.httpClient.put<Employee>(`${this.apiUrl}/${employeeId}`, employee);
  }

  public delete(employeeId: number): Observable<Employee> {
    return this.httpClient.delete<Employee>(`${this.apiUrl}/${employeeId}`);
  }
}
