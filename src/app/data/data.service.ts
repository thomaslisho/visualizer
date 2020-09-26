import { Injectable } from '@angular/core';
import { ArrayElement } from './arrayelement';
import { Master, sortingMethods } from './master';

@Injectable({
  providedIn: 'root',
})
export class DataService extends Master {
  constructor() {
    super();
    this.masterArray = [];
  }

  add(element: number): void {
    this.masterArray.push(new ArrayElement(element));
  }

  announce(): void {
    this.arrSubject.next(this.masterArray.slice());
  }

  getHeight(index: number): number {
    return this.masterArray[index].value;
  }

  getState(index: number): number {
    return this.masterArray[index].state;
  }

  get arraySize(): number {
    return this.masterArray.length;
  }

  emptyMaster(): void {
    this.masterArray = [];
  }

  sort(sortingMethod: string): Promise<void> {
    return super.sort(sortingMethod);
  }
  get sorting(): { name: string; value: string }[] {
    return sortingMethods;
  }
}
