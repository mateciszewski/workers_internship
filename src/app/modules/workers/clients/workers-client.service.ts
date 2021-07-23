import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Employee} from '../../../core/models/employee';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkersClientService {
  constructor(private httpClient: HttpClient) {
  }

  get() {
      return this.httpClient.get<Employee[]>('http://localhost:3000/workers');
  }

  post(worker: Employee) {
    return this.httpClient.post<Employee>('http://localhost:3000/workers', { ...worker });
  }
}


