import { Component, OnInit } from '@angular/core';
import { PathService } from "./path.service";
import { PlayService } from '../play.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  arr: number[] = [];
  playSubscription: Subscription;
  constructor(private pathService: PathService, private playService: PlayService) {}

  ngOnInit(){
    
    this.playSubscription = this.playService.arrSubject.subscribe(data=>{
      this.arr = data;
    });
    this.playService.addElements(50);
  }

  getDef(i: number): string {
    return this.pathService.getDefinition(i);
  }

  onClick(){
    this.playService.addElements(10);
    // this.arr = this.pathService.getArray();
  }
}
