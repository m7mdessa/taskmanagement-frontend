import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskDuration'
})
export class TaskDurationPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
