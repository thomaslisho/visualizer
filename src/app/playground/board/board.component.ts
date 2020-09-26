import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { PathService } from './path.service';
import { DataService } from '../../data/data.service';

import { ArrayElement } from '../../data/arrayelement';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  animations: [
    trigger('boardState', [
      state('in', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void=>*', [
        style({ transform: 'translateY(-50%)', opacity: 0 }),
        animate(1200),
      ]),
    ]),
  ],
})
export class BoardComponent implements OnInit, OnDestroy {
  arr: number[] = [];
  playSubscription: Subscription;

  constructor(
    private pathService: PathService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.playSubscription = this.dataService.arrSubject
      .pipe(
        map((data: ArrayElement[]) => {
          const arr: number[] = [];
          for (const element of data) {
            arr.push(element.value);
          }
          return arr;
        })
      )
      .subscribe((data) => {
        this.arr = data;
      });
  }

  getDef(i: number): string {
    return this.pathService.getDefinition(i);
  }

  height(index: number): number {
    return this.dataService.getHeight(index);
  }

  state(index: number): number {
    return this.dataService.getState(index);
  }
  ngOnDestroy(): void {
    this.playSubscription.unsubscribe();
  }
}
