import { Foo } from "./__mock__/Foo";
import { TestError1, TestError2 } from "./__mock__/errors";

describe("OnError TEST", () => {
  const foo = new Foo();
  beforeEach(() => {
    foo.reset();
  });

  it("에러가 발생하면, OnError 함수가 실행되어야 한다", async () => {
    foo.foo().catch((e) => {
      expect(foo.counter).toStrictEqual(1);
    });
  });
  it("CatchError 가 활성화되면, 해당 에러를 Catch 해야 한다", async () => {
    expect(async () => foo.fooWithCatch()).not.toThrowError();
  });

  it("OnError 데코레이터가 중첩되어 있어도, 모든 데코레이터를 처리할 수 있어야 한다", async () => {
    try {
      await foo.nestedOnError(TestError1);
    } catch (e) {
      expect(e instanceof TestError1).toStrictEqual(true);
      expect(foo.counter).toStrictEqual(1);
    }

    try {
      await foo.nestedOnError(TestError2);
    } catch (e) {
      expect(e instanceof TestError2).toStrictEqual(true);
      expect(foo.counter).toStrictEqual(100);
    }
  });
});
