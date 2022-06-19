import { ErrorHandler } from "../ErrorHandler";
import { handleError } from "../handleError";
import { TestError1, TestError2, TestError3 } from "./__mock__/errors";

describe("handleError TEST", () => {
  it("HandleError 가 정상적으로 동작해야 한다", () => {
    expect(() =>
      ErrorHandler.when(() => 1 === 1)
        .then(() => {
          throw new Error("TEST");
        })
        .execute()
    ).toThrowError(Error);
  });
  it("HandleError whenClause 에 해당되지 않는 경우, 에러를 발생시키면 안된다", () => {
    expect(() =>
      ErrorHandler.when(() => false)
        .then(() => {
          throw new Error("TEST");
        })
        .execute()
    ).not.toThrowError(Error);
  });
  test("에러를 발생시켜야 하는 경우에만 에러를 발생시켜야 한다", () => {
    try {
      handleError()
        .when(() => 1 < 0)
        .then(() => {
          throw new TestError1();
        })
        .when(() => 1 === 1)
        .then((message) => {
          throw new TestError2(message);
        })
        .when(1 < 0)
        .then((message) => {
          throw new TestError3(message);
        })
        .execute("문제가 발생하였습니다");
    } catch (e: any) {
      expect(e instanceof TestError2).toStrictEqual(true);
      expect(e.message).toMatchInlineSnapshot(`"문제가 발생하였습니다"`);
    }
  });
  it("fix 를 통해 전달받은 message 를 잘 전달해야 한다", () => {
    try {
      ErrorHandler.when(true)
        .then((message: string) => {
          throw new TestError1(message);
        })
        .execute("테스트 메세지");
    } catch (e: any) {
      expect(e.message).toMatchInlineSnapshot(`"테스트 메세지"`);
      expect(e instanceof TestError1).toStrictEqual(true);
    }
  });
});
