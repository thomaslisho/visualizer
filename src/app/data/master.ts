import { Subject } from 'rxjs';
import { ArrayElement, State } from './arrayelement';

export class Master {
  protected masterArray: ArrayElement[];
  arrSubject = new Subject<ArrayElement[]>();
  statSubject = new Subject<boolean>();

  get delay(): number {
    const delay = 1000 / this.masterArray.length;
    return delay < 20 ? 0 : delay;
  }

  constructor() {
    this.masterArray = [];
  }

  protected sort(sortingMethod: string) {
    switch (sortingMethod) {
      case sortingMethods[0].value:
        this.bubbleSort();
        break;
      case sortingMethods[1].value:
        this.selectionSort();
        break;
      case sortingMethods[2].value:
        this.insertionSort();
        break;
      case sortingMethods[3].value:
        this.quickSort(0, this.masterArray.length - 1);
        break;
      case sortingMethods[4].value:
        this.mergeSort(0, this.masterArray.length - 1);
        break;
      case sortingMethods[5].value:
        this.heapSort();
        break;
      default:
        console.log('Error Occured!')
        break;
    }
    // this.heapSort();
    // this.selectionSort();
    // this.quickSort(0, this.masterArray.length - 1);
    // this.mergeSort(0, this.masterArray.length - 1);
    // this.heapSort();
  }

  private sleep(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.delay));
  }
  private async heapSort() {
    let n = this.masterArray.length;
    for (let i = n / 2 - 1; i >= 0; i--) await this.heapify(n, i);
    for (let i = n - 1; i > 0; i--) {
      await this.swap(0, i);
      await this.sleep().then((_) => {
        this.masterArray[i].state = State.Sorted;
        this.arrSubject.next(this.masterArray);
      });
      await this.heapify(i, 0);
    }
    await this.sleep().then((_) => {
      this.masterArray[0].state = State.Sorted;
      this.arrSubject.next(this.masterArray);
    });
  }
  async heapify(n: number, i: number) {
    let largest = i,
      l = 2 * i + 1,
      r = 2 * i + 2;
    if (l < n && this.masterArray[l].value > this.masterArray[largest].value)
      largest = l;
    if (r < n && this.masterArray[r].value > this.masterArray[largest].value)
      largest = r;
    if (largest != i) {
      await this.swap(i, largest);
      await this.heapify(n, largest);
    }
  }

  async mergeSort(left: number, right: number) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await this.mergeSort(left, mid);
      await this.mergeSort(mid + 1, right);
      await this.merge(left, mid, right);
    }
  }

  async merge(left: number, mid: number, right: number) {
    const n1 = mid - left + 1,
      n2 = right - mid,
      leftArray: ArrayElement[] = [],
      rightArray: ArrayElement[] = [];
    for (let i = 0; i < n1; i++) leftArray.push(this.masterArray[left + i]);
    for (let j = 0; j < n2; j++) rightArray.push(this.masterArray[mid + 1 + j]);
    let i = 0,
      j = 0,
      k = left;

    while (i < n1 && j < n2) {
      await this.sleep().then((_) => {
        this.arrSubject.next(this.masterArray);
      });

      if (leftArray[i].value <= rightArray[j].value) {
        leftArray[i].state = State.IntermediateOne;
        this.masterArray[k] = leftArray[i];
        await this.sleep().then((_) => {
          this.arrSubject.next(this.masterArray);
        });
        i++;
      } else {
        rightArray[j].state = State.IntermediateTwo;
        this.masterArray[k] = rightArray[j];
        await this.sleep().then((_) => {
          this.arrSubject.next(this.masterArray);
        });
        j++;
      }
      this.masterArray[k].state =
        right - left === this.masterArray.length - 1
          ? State.Sorted
          : State.Idle;
      k++;
    }
    while (i < n1) {
      this.masterArray[k] = leftArray[i];
      this.masterArray[k].state = State.IntermediateOne;
      await this.sleep().then((_) => {
        this.arrSubject.next(this.masterArray);
        this.masterArray[k].state =
          right - left === this.masterArray.length - 1
            ? State.Sorted
            : State.Idle;
      });
      i++;
      k++;
    }
    while (j < n2) {
      this.masterArray[k] = rightArray[j];
      this.masterArray[k].state = State.IntermediateTwo;
      await this.sleep().then((_) => {
        this.arrSubject.next(this.masterArray);
        this.masterArray[k].state =
          right - left === this.masterArray.length - 1
            ? State.Sorted
            : State.Idle;
      });
      j++;
      k++;
    }
    await this.sleep().then((_) => {
      this.arrSubject.next(this.masterArray);
    });
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
      j = right;
    pivot.state = State.Sorted;
    await this.sleep().then((_) => {
      this.arrSubject.next(this.masterArray);
    });
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
  // this.statSubject.next(true);
}

export const sortingMethods: { name: string; value: string }[] = [
  { value: 'bubble', name: 'Bubble Sort' },
  { value: 'selection', name: 'Selection Sort' },
  { value: 'insertion', name: 'Insertion Sort' },
  { value: 'quick', name: 'Quick Sort' },
  { value: 'merge', name: 'Merge Sort' },
  { value: 'heap', name: 'Heap Sort' },
].slice();
