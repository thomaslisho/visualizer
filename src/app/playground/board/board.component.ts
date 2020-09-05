import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { PathService } from './path.service';
import { DataService } from '../../data/data.service';

import { ArrayElement } from '../../data/arrayelement';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  arr: number[] = [];
  playSubscription: Subscription;
  constructor(
    private pathService: PathService,
    private dataService: DataService
  ) {}

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

  get color(): { base: string; top: string } {
    return {
      base: 'stop-color: rgb(255, 0, 0); stop-opacity: 1',
      top: 'stop-color: yellow; stop-opacity: 1',
    };
  }
}
