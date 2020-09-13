import { Component, OnInit } from '@angular/core';
import { PlayService } from '../play.service';
import { DataService } from 'src/app/data/data.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent implements OnInit {
  sortingMethods: { name: string; value: string }[] = [];
  sortingMethod: { name: string; value: string };
  minSize = 121;
  panelOpenState: boolean = false;
  sortingState: number;
  thresholdConfig = {
    '0': { color: 'green' },
    '75': { color: 'orange' },
    '150': { color: 'red' },
  };

  constructor(
    private playService: PlayService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.playService.changeSize(this.minSize);
    this.sortingState = SortingStates.idle;
    this.sortingMethods = this.dataService.sorting;
    this.sortingMethod = this.sortingMethods[4];
  }

  valueSliderChange(event) {
    this.minSize = event.value;
    this.playService.changeSize(event.value);
  }

  play() {
    this.panelOpenState = false;
    if (
      this.sortingState == SortingStates.idle ||
      this.sortingState == SortingStates.end
    ) {
      this.sortingState = SortingStates.started;
      this.dataService.sort(this.sortingMethod.value).then(() => {
        this.sortingState = SortingStates.end;
      });
    } else {
      this.sortingState = SortingStates.idle;
    }
  }
  onChange(value: { name: string; value: string }) {
    this.sortingMethod = value;
    this.panelOpenState = !this.panelOpenState;
  }
}
enum SortingStates {
  idle,
  started,
  end,
}
