import { Retry } from "../../Retry";
import { TestError, TestError2 } from "./errors";
import { sleep } from "../../../../misc";

export class Foo {
  private _counter = 0;

  @Retry({
    times: 10,
  })
  async retry10() {
    this._counter++;
    throw new Error("retry10");
  }

  @Retry({
    times: 10,
    onEachError: (e: Error, self: Foo) => {
      self._counter++;
    },
  })
  async retryWithOnEachError() {
    throw new Error("retryWithOnEachError");
  }

  @Retry({
    times: 2,
    onEachError: (e: Error, self: Foo, args: any[]) => {
      self._counter++;
      args[0] = false;
    },
  })
  async retryWithArgs(args = true) {
    if (this._counter === 0) {
      throw new Error("retryWithArgs");
    }
    return args;
  }

  @Retry({
    times: 10,
    matchErrors: [TestError],
  })
  async retryWithMatchErrors_성공() {
    this._counter++;
    if (this._counter < 10) {
      throw new TestError();
    }
  }

  @Retry({
    times: 10,
    matchErrors: [TestError],
  })
  async retryWithMatchErrors_실패() {
    this._counter++;
    if (this._counter < 10) {
      throw new TestError2();
    }
  }

  @Retry({
    times: 3,
    onEachError: async () => {
      await sleep(1000);
    },
  })
  async retryWithSleep() {
    throw new Error();
  }

  @Retry({
    times: 3,
    onEachError: async () => {
      console.log("No MatchError");
      await sleep(1000);
    },
  })
  @Retry({
    times: 3,
    onEachError: async () => {
      console.log("TestError");
      await sleep(1000);
    },
    matchErrors: [TestError],
  })
  async nestedRetry() {
    throw new TestError();
  }

  get counter() {
    return this._counter;
  }
  reset() {
    this._counter = 0;
  }
}
