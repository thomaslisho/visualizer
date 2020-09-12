import { Injectable } from '@angular/core';
import { ArrayElement } from "./arrayelement";
import { Master, sortingMethods } from "./master";

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

  sort(sortingMethod: string): void{
    return super.sort(sortingMethod);
  }
  get sorting(){
    return sortingMethods;
  }
}
