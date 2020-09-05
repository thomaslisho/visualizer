import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ArrayElement } from "./arrayelement";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private masterArray: ArrayElement[];
  arrSubject = new Subject<ArrayElement[]>();
  
  constructor() { 
    this.masterArray=[];
  }

  add(element: number){
    this.masterArray.push(new ArrayElement(element));
  }

  announce(){
    this.arrSubject.next(this.masterArray.slice());
  }

  getHeight(index: number){
    return this.masterArray[index].getValue();
  }

  get arraySize(){
    return this.masterArray.length;
  }

  emptyMaster(){
    this.masterArray=[];
  }
}
