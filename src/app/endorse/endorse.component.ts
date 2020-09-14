import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-endorse',
  templateUrl: './endorse.component.html',
  styleUrls: ['./endorse.component.scss']
})
export class EndorseComponent implements OnInit {

  tabName="list";

  constructor() { }

  ngOnInit(): void {
  }
  click(name: string){
    this.tabName = name;
  }
}
