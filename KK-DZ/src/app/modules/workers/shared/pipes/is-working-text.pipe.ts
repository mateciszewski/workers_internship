import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'isWorkingText'
})
export class IsWorkingText implements PipeTransform {
  transform(isWorking: boolean): string {
    return isWorking ? 'pracujący' : 'bezrobotny';
  }
}
