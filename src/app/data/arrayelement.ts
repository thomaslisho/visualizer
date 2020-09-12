export enum State {
  Idle,
  IntermediateOne,
  IntermediateTwo,
  Sorted,
}
export class ArrayElement {
  constructor(public value: number, public state = State.Idle) {}
}
export const colorLabels={
  0:'rgba(7, 234, 255, 0.911)',
  1:'rgb(255, 0, 0)',
  2:'#ffee00',
  3:'hsl(106, 100%, 51%)' 
}