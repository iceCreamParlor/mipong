import { OnError } from "../../OnError";
import { TestError1, TestError2 } from "./errors";
import { AnyConstructor } from "../../../../types";

export class Foo {
  private _counter = 0;

  @OnError({
    callback: (e: Error, self: Foo) => {
      self._counter++;
    },
  })
  async foo() {
    throw new Error("test Error");
  }

  @OnError({
    callback: (e: Error, self: Foo) => {},
    catchError: true,
  })
  async fooWithCatch() {
    throw new Error("test Error");
  }

  @OnError({
    callback: (e: Error, self: Foo) => {
      self._counter = 100;
    },
    matchErrors: [TestError2],
  })
  @OnError({
    callback: (e: Error, self: Foo) => {
      self._counter = 1;
    },
    matchErrors: [TestError1],
  })
  async nestedOnError(e: AnyConstructor) {
    if (this._counter === 0) {
      throw new e();
    } else {
      throw new e();
    }
  }

  reset() {
    this._counter = 0;
  }
  get counter() {
    return this._counter;
  }
}
