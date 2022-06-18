import { Foo } from "./__mock__/Foo";
import { TestError2 } from "./__mock__/errors";

describe("Retry decorator TEST", () => {
  const foo = new Foo();

  beforeEach(() => {
    foo.reset();
  });

  it("count 에 명시된 횟수만큼 함수가 재시도되어야 한다", async () => {
    try {
      await foo.retry10();
    } catch (e: any) {
      expect(e.message).toMatchInlineSnapshot(`"retry10"`);
    }
    expect(foo.counter).toStrictEqual(10);
  });
  it("onEachError 에 명시된 함수가 실패할 때마다 실행되어야 한다", async () => {
    try {
      await foo.retryWithOnEachError();
    } catch (e: any) {
      expect(e.message).toMatchInlineSnapshot(`"retryWithOnEachError"`);
    }
    expect(foo.counter).toStrictEqual(10);
  });
  it("onEachError 에 명시된 대로 함수의 파라미터를 변경할 수 있어야 한다", async () => {
    const result = await foo.retryWithArgs();

    expect(result).toStrictEqual(false);
  });
  it("matchErrors 에 명시된 에러만 재시도되어야 한다", async () => {
    await foo.retryWithMatchErrors_성공();

    expect(foo.counter).toStrictEqual(10);
  });
  it("matchErrors 에 명시된 에러가 아니면 재시도되면 안된다", async () => {
    try {
      await foo.retryWithMatchErrors_실패();
    } catch (e) {
      expect(e instanceof TestError2).toStrictEqual(true);
    }
  });
});
