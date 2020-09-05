import { Injectable } from '@angular/core';
import { ArrayElement } from "./arrayelement";
import { Sort } from "./master";

@Injectable({
  providedIn: 'root'
})
export class DataService extends Sort {
  
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

  get arraySize(){
    return this.masterArray.length;
  }

  emptyMaster(){
    this.masterArray=[];
  }

  sort(): Promise<void>{
    return super.sort();
  }
} 