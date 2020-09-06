import { Subject } from 'rxjs';
import { ArrayElement, State } from './arrayelement';

export class Sort {
  protected masterArray: ArrayElement[];
  arrSubject = new Subject<ArrayElement[]>();
  statSubject = new Subject<boolean>();

  sorted: boolean;

  get delay(): number {
    const delay = 1000 / this.masterArray.length;
    return delay < 20 ? 0 : delay;
  }

  constructor() {
    this.masterArray = [];
    this.sorted = true;
  }

  private sleep(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.delay));
  }

  protected async sort() {
    let count: number = 0;
    const counter = setInterval(() => count++, 1);
    for (let i = 0; i < this.masterArray.length; i++) {
      for (let j = 0; j < this.masterArray.length - i - 1; j++) {
        if (this.masterArray[j].value > this.masterArray[j + 1].value) {
          this.masterArray[j].state = State.IntermediateOne;
          this.masterArray[j + 1].state = State.IntermediateTwo;
          let temp = this.masterArray[j];
          this.masterArray[j] = this.masterArray[j + 1];
          this.masterArray[j + 1] = temp;
          await this.sleep().then((_) => {
            this.masterArray[j + 1].state = this.masterArray[j].state =
              State.Idle;
          });
        }
      }
      this.masterArray[this.masterArray.length - (i + 1)].state = State.Sorted;
      this.arrSubject.next(this.masterArray);
    }
    clearInterval(counter);

    for (let element of this.masterArray) {
      element.state = State.Sorted;
    }

    this.arrSubject.next(this.masterArray);
    this.statSubject.next(this.sorted);
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
