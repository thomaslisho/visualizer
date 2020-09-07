import { Injectable } from '@angular/core';
import { ArrayElement } from "./arrayelement";
import { Master } from "./master";

@Injectable({
  providedIn: 'root'
})
export class DataService extends Master {
  
  constructor() {
    super();
    this.masterArray=[];
  }

  add(element: number){
    this.masterArray.push(new ArrayElement(element));
  }

  announce(){
    this.arrSubject.next(this.masterArray.slice());
  }

  getHeight(index: number){
    return this.masterArray[index].value;
  }

  getState(index:number){
    return this.masterArray[index].state;
  }

  get arraySize(){
    return this.masterArray.length;
  }

  emptyMaster(){
    this.masterArray=[];
  }

  sort(): void{
    return super.sort();
  }
} 