import { sleep } from "../../../misc";
import { useTimer } from "../useTimer";

describe("useTimer TEST", () => {
  it("타이머에 설정한 시간이 지나면, 콜백 함수가 실행되어야 한다", async () => {
    let isCalled = false;
    const [isExpired, resetTimer] = useTimer({
      timeout: 1000,
      callback: () => (isCalled = true),
    });
    resetTimer();
    expect(isCalled).toStrictEqual(false);
    expect(isExpired()).toStrictEqual(false);

    await sleep(1000);

    expect(isCalled).toStrictEqual(true);
    expect(isExpired()).toStrictEqual(true);
  });
  it("타이머에 설정한 시간이 지나면, 비동기 콜백 함수가 실행되어야 한다", async () => {
    let isCalled = false;
    const [isExpired, resetTimer] = useTimer({
      timeout: 1000,
      callback: async () => {
        isCalled = true;
        await sleep(1000);
      },
    });
    resetTimer();
    expect(isCalled).toStrictEqual(false);
    expect(isExpired()).toStrictEqual(false);

    await sleep(1000);

    expect(isCalled).toStrictEqual(true);
    expect(isExpired()).toStrictEqual(false);

    await sleep(1000);
    expect(isExpired()).toStrictEqual(true);
  });
});
