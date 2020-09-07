import { Subject } from 'rxjs';
import { ArrayElement, State } from './arrayelement';
import { async } from 'rxjs/internal/scheduler/async';

export class Master {
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

  protected sleep(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.delay));
  }

  protected sort() {
    this.insertion();
  }
  private async insertion() {
    for (let i = 0; i < this.masterArray.length; i++) {
      let key = this.masterArray[i].value;
      this.masterArray[i].state = State.IntermediateOne;
      let j = i - 1;
      while (j >= 0 && this.masterArray[j].value > key) {
        this.masterArray[j + 1].value = this.masterArray[j].value;
        j = j - 1;
      }
      await this.sleep().then((_) => {
        this.arrSubject.next(this.masterArray);
      });
      this.masterArray[j + 1].value = key;
    }
    this.arrSubject.next(this.masterArray);
  }

  private async selectionSort() {
    for (let i = 0; i < this.masterArray.length; i++) {
      let min = i;
      this.masterArray[min].state = State.IntermediateOne;
      for (let j = i + 1; j < this.masterArray.length; j++)
        if (this.masterArray[j].value < this.masterArray[min].value) min = j;

      if (min != i) {
        this.masterArray[min].state = State.IntermediateTwo;
        let tmp = this.masterArray[i].value;
        this.masterArray[i].value = this.masterArray[min].value;
        this.masterArray[min].value = tmp;
      }
      await this.sleep().then((_) => {
        this.masterArray[min].state = State.Idle;
        this.masterArray[i].state = State.Sorted;
        this.arrSubject.next(this.masterArray);
      });
    }
  }

  private async bubbleSort() {
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
    this.arrSubject.next(this.masterArray);
    this.statSubject.next(this.sorted);
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
