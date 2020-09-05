export enum State {
  Idle,
  Intermediate,
  Sorted,
}
export class ArrayElement {
  constructor(private value: number, private state = State.Idle) {}
  getValue() {
    return this.value;
  }
  getState() {
    return this.state;
  }
}
