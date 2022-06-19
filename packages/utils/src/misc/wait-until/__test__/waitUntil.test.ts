import { waitUntil } from "../waitUntil";

describe("waitUntil TEST", () => {
  it("maxTimeout 이 지날동안 validator 가 통과하지 않는 경우, 에러를 발생시켜야 한다", async () => {
    try {
      await waitUntil({
        validator: () => false,
        maxTimeout: 500,
        interval: 100,
      });
      expect(true).toStrictEqual(false);
    } catch (e: any) {
      expect(e).toMatchInlineSnapshot(`"최대 대기 시간이 경과하였습니다"`);
    }
  });
  it("waitUntil 조건이 truthy 한 경우, 에러가 발생하면 안된다 (1)", async () => {
    try {
      await waitUntil({
        validator: () => true,
      });
    } catch (e) {
      expect(true).toStrictEqual(false);
    }
  });
  it("waitUntil 조건이 truthy 한 경우, 에러가 발생하면 안된다 (2)", async () => {
    let count = 0;
    try {
      await waitUntil({
        validator: () => ++count > 3,
      });
    } catch (e) {
      expect(true).toStrictEqual(false);
    }
  });
});
