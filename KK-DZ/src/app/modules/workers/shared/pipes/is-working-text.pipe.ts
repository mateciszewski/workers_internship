import { Pipe, PipeTransform } from '@angular/core';

import { EmployeeEntity } from 'src/app/core/models/employee-entity';

@Pipe({
    name: 'isWorkingText'
})
export class IsWorkingText implements PipeTransform {
  transform(worker: EmployeeEntity): string {
    return worker.isWorking ? 'pracujący' : 'bezrobotny';
  }
}
