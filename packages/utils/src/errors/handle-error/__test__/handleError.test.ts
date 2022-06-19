import { ErrorHandler } from "../ErrorHandler";
import { TestError1, TestError2, TestError3 } from "./__mock__/errors";

describe("handleError TEST", () => {
  it("HandleError 가 정상적으로 동작해야 한다", () => {
    expect(() =>
      ErrorHandler.when(() => 1 === 1)
        .then(() => {
          throw new Error("TEST");
        })
        .fix()
    ).toThrowError(Error);
  });
  it("HandleError whenClause 에 해당되지 않는 경우, 에러를 발생시키면 안된다", () => {
    expect(() =>
      ErrorHandler.when(() => false)
        .then(() => {
          throw new Error("TEST");
        })
        .fix()
    ).not.toThrowError(Error);
  });
  it("HandleError 중 에러를 발생시켜야 하는 경우에만 에러를 발생시켜야 한다", () => {
    expect(() =>
      ErrorHandler.when(false)
        .then(() => {
          throw new TestError1();
        })
        .when(true)
        .then(() => {
          throw new TestError2();
        })
        .when(() => false)
        .then(() => {
          throw new TestError3();
        })
        .fix()
    ).toThrowError(TestError2);
  });
  it("fix 를 통해 전달받은 message 를 잘 전달해야 한다", () => {
    try {
      ErrorHandler.when(true)
        .then((message: string) => {
          throw new TestError1(message);
        })
        .fix("테스트 메세지");
    } catch (e: any) {
      expect(e.message).toMatchInlineSnapshot(`"테스트 메세지"`);
      expect(e instanceof TestError1).toStrictEqual(true);
    }
  });
});
