import { Subject } from 'rxjs';
import { ArrayElement } from './arrayelement';

export class Sort {
  protected masterArray: ArrayElement[];
  arrSubject = new Subject<ArrayElement[]>();

  get delay(): number {
    const delay = 1000 / this.masterArray.length;
    return delay < 20 ? 0 : delay;
  }

  constructor() {
    this.masterArray = [];
  }

  private sleep(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.delay));
  }

  protected async sort() {
    let count: number = 0;
    const counter = setInterval(() => count++, 1);

    for (let i = 0; i < this.masterArray.length; i++) {
      for (let j = 0; j < this.masterArray.length; j++) {
        if (this.masterArray[i].value < this.masterArray[j].value) {
          let temp = this.masterArray[j];
          this.masterArray[j] = this.masterArray[i];
          this.masterArray[i] = temp;
          await this.sleep().then((_) =>
            this.arrSubject.next(this.masterArray)
          );
        }
      }
    }
    clearInterval(counter);
    console.log(count);
  }
}

export enum Sorting {
  Bubble,
  Selection,
  Insertion,
  Merge,
  Quick,
  Heap,
}
