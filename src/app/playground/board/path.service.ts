import { Injectable } from '@angular/core';
import { PlayService } from '../play.service';

@Injectable({
  providedIn: 'root',
})
export class PathService{

  private bottomPadding: number = 20;
  private leftPadding: number = 15;

  private minGap: number = 0.59;
  private maxGap: number = 2.5;

  private minRadius: number = 0.01;
  private maxRadius: number = 5;


  constructor(private playService: PlayService) {
  }

  private get arraySize(){
    return this.playService.size;
  }

  private get viewport(){
    return this.playService.viewport;
  }

  private get width(): number {
    return this.viewport.width / (2 * this.arraySize.current);
  }

  private get radius(): number {
    let result =
      this.maxRadius -
      this.maxRadius * (this.arraySize.current / this.arraySize.max) * this.maxRadius;
    return result < this.minRadius ? this.minRadius : result;
  }

  private get gap(): number {
    let result =
      this.maxGap -
      (this.maxGap - this.minGap) * (this.arraySize.current / this.arraySize.max);
    return result;
  }

  private get initPos(): number {
    let result = this.viewport.width - this.arraySize.current * (this.width + this.gap);
    return this.leftPadding > result ? this.leftPadding : result / 2;
  }

  getDefinition(index: number): string {
    return `M ${this.initPos + (this.width + this.gap) * index} ${
      this.viewport.height - this.bottomPadding
    }
    h ${this.width}
    v -${this.playService.height(index)}
    a${this.radius},${this.radius} 0 0 0 -${this.radius},-${this.radius}
    h -${this.width - 2 * this.radius}
    a${this.radius},${this.radius} 0 0 0 -${this.radius},${this.radius}
    z`;
  }
}
