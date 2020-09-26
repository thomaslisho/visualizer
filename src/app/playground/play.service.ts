import { Injectable } from '@angular/core';

import { DataService } from '../data/data.service';

@Injectable()
export class PlayService {
  private sizeInput: number;

  private viewportWidth = 850;
  private viewPortHeight = 320;
  private maxSize = 200;

  changeSize(input: number): void {
    this.sizeInput = input;
    this.addElements();
  }

  constructor(private dataService: DataService) {}

  height(index: number): number {
    return this.dataService.getHeight(index);
  }

  get size(): { max: number; current: number } {
    return { max: this.maxSize, current: this.dataService.arraySize };
  }

  get viewport(): { width: number; height: number } {
    return { width: this.viewportWidth, height: this.viewPortHeight };
  }

  addElements(): void {
    this.dataService.emptyMaster();
    for (let i = 0; i < this.sizeInput; i++) {
      const k = Math.floor(
        Math.random() * (this.viewPortHeight - 30 - 10 + 1) + 10
      );
      this.dataService.add(k);
    }
    this.dataService.announce();
  }
}
