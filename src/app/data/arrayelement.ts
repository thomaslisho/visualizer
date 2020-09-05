export enum State {
  Idle,
  Intermediate,
  Sorted,
}
export class ArrayElement {
  constructor(public value: number, public state = State.Idle) {}
  // getValue() {
  //   return this.value;
  // }
  // getState() {
  //   return this.state;
  // }
  // setValue(value) {
  //   this.value = value;
  // }
  // setState(value) {
  //   this.setState = value;
  // }
}
