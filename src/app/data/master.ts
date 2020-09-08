import { Subject } from 'rxjs';
import { ArrayElement, State } from './arrayelement';

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
    this.selectionSort();
    // this.quickSort(0, this.masterArray.length - 1);
  }



  private async swap(leftIndex: number, rightIndex: number) {
    this.masterArray[leftIndex].state = State.IntermediateTwo;
    this.masterArray[rightIndex].state = State.IntermediateOne;
    var temp = this.masterArray[leftIndex];
    this.masterArray[leftIndex] = this.masterArray[rightIndex];
    this.masterArray[rightIndex] = temp;
    await this.sleep().then((_) => {
      this.arrSubject.next(this.masterArray);
    });
    this.masterArray[rightIndex].state = this.masterArray[leftIndex].state =
      State.Idle;
  }
  
  private async partition(left: number, right: number) {
    var pivot = this.masterArray[Math.floor((right + left) / 2)], //middle element
      i = left, //left pointer
      j = right; //right pointer
    while (i <= j) {
      while (this.masterArray[i].value < pivot.value) {
        i++;
        this.masterArray[i].state = State.IntermediateOne;
        await this.sleep().then((_) => {
          this.arrSubject.next(this.masterArray);
          this.masterArray[i].state = State.Idle;
        });
      }
      while (this.masterArray[j].value > pivot.value) {
        j--;
        this.masterArray[j].state = State.IntermediateTwo;
        await this.sleep().then((_) => {
          this.arrSubject.next(this.masterArray);
          this.masterArray[j].state = State.Idle;
        });
        // this.masterArray[j].state = State.IntermediateOne;
      }

      if (i <= j) {
        await this.swap(i, j);
        i++;
        j--;
      }
    }
    return i;
  }

  private async quickSort(left: number, right: number) {
    var index: number;
    if (this.masterArray.length > 1) {
      index = await this.partition(left, right);
      
      if (left < index - 1) {
        await this.quickSort(left, index - 1);
        await this.sleep().then((_) => {
          this.arrSubject.next(this.masterArray);
        });
      }
      if (index < right) {
        await this.quickSort(index, right);
        await this.sleep().then((_) => {
          this.arrSubject.next(this.masterArray);
        });
      }
      this.masterArray[index].state = State.Sorted;
    }
    this.masterArray[left].state = State.Sorted;
  }

  

  private async insertionSort() {
    for (let i = 0; i < this.masterArray.length; i++) {
      let key = this.masterArray[i].value;
      let j = i - 1;
      while (j >= 0 && this.masterArray[j].value > key) {
        this.masterArray[j + 1].value = this.masterArray[j].value;
        this.masterArray[j].state = State.IntermediateOne;
        this.masterArray[j + 1].state = State.IntermediateTwo;
        j = j - 1;
        await this.sleep().then((_) => {
          this.arrSubject.next(this.masterArray);
        });
        this.masterArray[j + 2].state = State.Sorted;
        this.masterArray[j + 1].state = State.Sorted;
      }
      this.masterArray[j + 1].value = key;
      this.masterArray[i].state = State.Sorted;
    }
  }

  private async selectionSort() {
    for (let i = 0; i < this.masterArray.length; i++) {
      let min = i;
      this.masterArray[min].state = State.IntermediateTwo;
      for (let j = i + 1; j < this.masterArray.length; j++)
        if (this.masterArray[j].value < this.masterArray[min].value) min = j;

      await this.sleep().then((_) => {
        this.masterArray[min].state = State.IntermediateTwo;
        this.arrSubject.next(this.masterArray);
      });
      if (min != i) {
        await this.sleep().then((_) => {
          this.masterArray[i].state = this.masterArray[min].state =
            State.IntermediateOne;
          this.arrSubject.next(this.masterArray);
        });
        let tmp = this.masterArray[i].value;
        this.masterArray[i].value = this.masterArray[min].value;
        this.masterArray[min].value = tmp;
        await this.sleep().then((_) => {
          this.masterArray[min].state = this.masterArray[i].state =
            State.IntermediateTwo;
          this.arrSubject.next(this.masterArray);
        });
      }
      await this.sleep().then((_) => {
        this.arrSubject.next(this.masterArray);
      });
      this.masterArray[min].state = State.Idle;
      this.masterArray[i].state = State.Sorted;
    }
  }

  private async bubbleSort() {
    for (let i = 0; i < this.masterArray.length; i++) {
      for (let j = 0; j < this.masterArray.length - i - 1; j++) {
        this.masterArray[j].state = State.IntermediateTwo;
        this.masterArray[j + 1].state = State.IntermediateTwo;
        if (this.masterArray[j].value > this.masterArray[j + 1].value) {
          await this.sleep().then((_) => {
            this.arrSubject.next(this.masterArray);
          });
          let temp = this.masterArray[j];
          this.masterArray[j] = this.masterArray[j + 1];
          this.masterArray[j + 1] = temp;
          this.masterArray[j].state = State.IntermediateOne;
          this.masterArray[j + 1].state = State.IntermediateOne;
          await this.sleep().then((_) => {
            this.arrSubject.next(this.masterArray);
          });
          this.masterArray[j].state = State.IntermediateTwo;
          this.masterArray[j + 1].state = State.IntermediateTwo;
        }
        await this.sleep().then((_) => {
          this.arrSubject.next(this.masterArray);
        });
        this.masterArray[j + 1].state = State.Idle;
        this.masterArray[j].state = State.Idle;
      }
      this.masterArray[this.masterArray.length - (i + 1)].state = State.Sorted;
    }
  }
}

export enum Sorting {
  Bubble,
  Selection,
  Insertion,
  Quick,
  Merge,
  Heap,
}
