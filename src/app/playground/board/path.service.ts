import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathService implements OnInit {
  arr:number[]=[];
  viewportWidth:number=800;
  viewPortHeight:number = 350;

  ngOnInit(): void {
    
  }

  private get width():number{
    return this.viewportWidth/(2*this.arr.length);
  }
  private get radius():number{
    return 5;
  }

  private get gap():number{
    return 2.5;
  }


  constructor() {
    for (var i = 0; i < 5; i++) {
      var k = Math.floor(Math.random() * ((320-10)+1) + 10);
      console.log(k);
      this.arr.push(k);
    }
   }
  
  getDefinition(index: number): string{
    // var width=800/(2*this.arr.length);
    // var radius= 5;
    console.log(this.arr[index]);
    return `M ${170 + (this.width + this.gap) * index} 330
    h ${this.width}
    v -${this.arr[index]}
    a${this.radius},${this.radius} 0 0 0 -${this.radius},-${this.radius}
    h -${this.width-2*this.radius}
    a${this.radius},${this.radius} 0 0 0 -${this.radius},${this.radius}
    z`;
  }

  getArray():number[]{
    console.log(this.arr);
    return this.arr;
  }
}
