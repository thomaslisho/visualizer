import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PlayService {
  private masterArray: number[];
  arrSubject = new Subject<number[]>();

  private viewportWidth: number = 850;
  private viewPortHeight: number = 350;
  private maxSize: number = 500;


  constructor() {
    this.masterArray = [];
  }

  height(index: number) {
    return this.masterArray[index];
  }

  get size(): { max: number; current: number } {
    return { max: this.maxSize, current: this.masterArray.length };
  }

  get viewport(): { width: number; height: number } {
    return { width: this.viewportWidth, height: this.viewPortHeight };
  }

  addElements(count: number) {
    if(this.masterArray.length>=500)
    return
    for (var i = 0; i < count; i++) {
      var k = Math.floor(
        Math.random() * (this.viewPortHeight - 30 - 10 + 1) + 10
      );
      this.masterArray.push(k);
    }
    this.arrSubject.next(this.masterArray.slice());
  }
}
