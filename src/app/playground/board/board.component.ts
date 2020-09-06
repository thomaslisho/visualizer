import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { PathService } from './path.service';
import { DataService } from '../../data/data.service';

import { ArrayElement, State } from '../../data/arrayelement';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  arr: number[] = [];
  playSubscription: Subscription;
  statSubscription: Subscription;
  glowTime: number = 10000;

  sorted: boolean;

  constructor(
    private pathService: PathService,
    private dataService: DataService
  ) {
    this.sorted = false;
  }

  ngOnInit() {
    this.playSubscription = this.dataService.arrSubject
      .pipe(
        map((data: ArrayElement[]) => {
          const arr: number[] = [];
          for (let element of data) {
            arr.push(element.value);
          }
          return arr;
        })
      )
      .subscribe((data) => {
        this.arr = data;
      });

    this.statSubscription = this.dataService.statSubject.subscribe((data) => {
      this.sorted = data;
      setTimeout((_) => (this.sorted = false), this.glowTime);
    });
  }

  getDef(i: number): string {
    return this.pathService.getDefinition(i);
  }

  height(index: number) {
    return this.dataService.getHeight(index);
  }
  clickMe() {
    this.dataService.sort();
  }

  state(index: number) {
    if (this.sorted) return State.Glow;
    return this.dataService.getState(index);
  }
  ngOnDestroy(): void {
    this.playSubscription.unsubscribe();
    this.statSubscription.unsubscribe();
  }
}
