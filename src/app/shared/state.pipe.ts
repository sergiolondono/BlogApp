import { Pipe } from '@angular/core';
import { States } from './states';

@Pipe({name: 'convertState'})
export class StatePipe {
  transform(value: number): string {
    return States[value];
  }
}