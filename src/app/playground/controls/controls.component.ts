import { Component, OnInit } from '@angular/core';
import { PlayService } from '../play.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent implements OnInit {
  constructor(private playServiec: PlayService) {}

  minSize = 100;
  panelOpenState: boolean;
  ngOnInit(): void {
    this.playServiec.changeSize(this.minSize);
  }
  
  sliderChange(event) {
    this.minSize = event.value;
    this.playServiec.changeSize(event.value);
  }

  lick(){
    // this.playServiec.sort();
  } 
}
