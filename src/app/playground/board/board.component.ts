import { Component, OnInit } from '@angular/core';
import { PathService } from "./path.service";
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  arr: number[] = [];

  constructor(private pathService: PathService) {}
  
  ngOnInit(){
    this.arr = this.pathService.getArray();
  }

  changeColor(i): string {
    return 'green';
  }

  getDef(i: number): string {
    return this.pathService.getDefinition(i);
  }
}
