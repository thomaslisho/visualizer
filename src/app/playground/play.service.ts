import { Injectable } from '@angular/core';

import { DataService } from "../data/data.service";

@Injectable()
export class PlayService {
  private sizeInput: number;

  private viewportWidth: number = 850;
  private viewPortHeight: number = 320;
  private maxSize: number = 200;

  changeSize(input: number) {
    this.sizeInput = input;
    this.addElements();
  }

  constructor(private dataService: DataService) {
  }

  height(index: number) {
    return this.dataService.getHeight(index);
  }

  get size(): { max: number; current: number } {
    return { max: this.maxSize, current: this.dataService.arraySize };
  }

  get viewport(): { width: number; height: number } {
    return { width: this.viewportWidth, height: this.viewPortHeight };
  }

  addElements() {
    this.dataService.emptyMaster();
    for (var i = 0; i < this.sizeInput; i++) {
      var k = Math.floor(
        Math.random() * (this.viewPortHeight - 30 - 10 + 1) + 10
      );
      this.dataService.add(k);
    }
    this.dataService.announce();
  }
}
