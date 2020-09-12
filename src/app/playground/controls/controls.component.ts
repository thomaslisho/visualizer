import { Component, OnInit } from '@angular/core';
import { PlayService } from '../play.service';
import { DataService } from 'src/app/data/data.service';
import { sortingMethods } from 'src/app/data/master';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent implements OnInit {
  sortingMethods: { name: string; value: string }[] = [];
  sortingMethod: { name: string; value: string };
  minSize = 150;
  panelOpenState: boolean = false;

  constructor(
    private playService: PlayService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.playService.changeSize(this.minSize);
    this.sortingMethods = this.dataService.sorting;
    this.sortingMethod = this.sortingMethods[4];
  }

  sliderChange(event) {
    this.minSize = event.value;
    this.playService.changeSize(event.value);
  }

  play() {
    this.dataService.sort(this.sortingMethod.value);
  }
  onChange(value: { name: string; value: string }) {
    this.sortingMethod = value;
    this.panelOpenState = !this.panelOpenState;
  }
}
