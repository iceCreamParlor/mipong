import { Interval } from "../../../interval/Interval";

export class Foo {
  private index = 0;
  @Interval({
    timeout: 1000,
    until: (self: Foo) => self.index < 4,
    maxCount: 2,
  })
  foo() {
    this.index++;
    console.log(`index : ${this.index}`);
  }
}
