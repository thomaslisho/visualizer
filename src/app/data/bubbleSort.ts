import { ArrayElement, State } from './arrayelement';
import { Subject } from 'rxjs';

export function bubbleSort(
  data: ArrayElement[],
  subject: Subject<ArrayElement[]>[]
): ArrayElement[] {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (data[i] > data[j]) {
        let temp = data[i];
        data[j] = data[i];
        data[i] = temp;
        
      }
    }
  }
  return data;
}
