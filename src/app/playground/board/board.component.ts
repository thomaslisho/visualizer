import { Component, OnInit } from '@angular/core';
import { PathService } from './path.service';
import { DataService } from '../../data/data.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
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
          for (let i = 0; i < data.length; i++) {
            arr.push(data[i].getValue());
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
}
