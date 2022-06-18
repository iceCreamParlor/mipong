import { createError, generateCreateError } from "../createError";

describe("createError TEST", () => {
  it("Custom Seperator 를 통한 createError 가 잘 동작해야 한다", () => {
    const createErrorWithEqual = generateCreateError("=");
    const { TestError } = createErrorWithEqual([
      "TestError=테스트 에러 메세지",
    ] as const);

    try {
      throw new TestError();
    } catch (e: any) {
      expect(e instanceof TestError).toStrictEqual(true);
      expect(e.message).toMatchInlineSnapshot(`"테스트 에러 메세지"`);
    }
  });
  it("에러가 잘 생성되고, 에러를 발생시켜야 한다", () => {
    const { TestError1 } = createError(["TestError1"] as const);

    expect(() => {
      throw new TestError1();
    }).toThrowError(TestError1);
  });
  it("디폴트 메세지를 포함한 에러 생성이 정상적으로 이루어져야 한다", () => {
    const { TestError } = createError([
      "TestError: 테스트 에러 메세지",
    ] as const);

    try {
      throw new TestError();
    } catch (e: any) {
      expect(e instanceof TestError).toStrictEqual(true);
      expect(e.message).toMatchInlineSnapshot(`"테스트 에러 메세지"`);
    }
  });
});
