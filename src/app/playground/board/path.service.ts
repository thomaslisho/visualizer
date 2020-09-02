import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PathService implements OnInit {
  private arr: number[] = [];
  private viewportWidth: number = 900;
  private viewPortHeight: number = 375;
  private bottomGap: number = 20;
  private leftGap: number = 20;

  private minGap: number = 0.65;
  private maxGap: number = 2.5;

  private minRadius: number = 0.01;
  private maxRadius: number = 5;

  private maxSize: number = 500;

  ngOnInit(): void {}

  private get width(): number {
    return this.viewportWidth / (2 * this.arr.length);
  }

  private get radius(): number {
    let result =
      this.maxRadius -
      this.maxRadius * (this.arr.length / this.maxSize) * this.maxRadius;
    return result < this.minRadius ? this.minRadius : result;
  }

  private get gap(): number {
    let result =
      this.maxGap -
      (this.maxGap - this.minGap) * (this.arr.length / this.maxSize);
    return result;
  }

  private get initPos(): number {
    let result = this.viewportWidth - this.arr.length * (this.width + this.gap);
    return this.leftGap > result ? this.leftGap : result / 2;
  }

  constructor() {
    for (var i = 0; i < 10; i++) {
      var k = Math.floor(
        Math.random() * (this.viewPortHeight - 30 - 10 + 1) + 10
      );
      this.arr.push(k);
    }
  }

  getDefinition(index: number): string {
    return `M ${this.initPos + (this.width + this.gap) * index} ${
      this.viewPortHeight - this.bottomGap
    }
    h ${this.width}
    v -${this.arr[index]}
    a${this.radius},${this.radius} 0 0 0 -${this.radius},-${this.radius}
    h -${this.width - 2 * this.radius}
    a${this.radius},${this.radius} 0 0 0 -${this.radius},${this.radius}
    z`;
  }

  getArray(): number[] {
    return this.arr;
  }
  addToArr() {
    if (this.arr.length >= this.maxSize) return;
    for (var i = 0; i < 10; i++) {
      var k = Math.floor(
        Math.random() * (this.viewPortHeight - 30 - 10 + 1) + 10
      );
      this.arr.push(k);
    }
    console.log(this.arr);
  }
}
