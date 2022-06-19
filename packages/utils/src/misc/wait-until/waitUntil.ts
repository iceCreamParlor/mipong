import { BooleanAsyncFunction, BooleanFunction } from "../../types";

type WaitUntilOption = {
  validator: BooleanFunction | BooleanAsyncFunction;
  interval?: number;
  maxTimeout?: number;
};
export async function waitUntil(param: WaitUntilOption) {
  const { validator, interval = 100, maxTimeout = 1000 * 10 } = param;
  let index = 0;

  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      const elapsed = ++index * interval;

      if (elapsed >= maxTimeout) {
        clearInterval(timer);
        reject("최대 대기 시간이 경과하였습니다");
      }
      const shouldStop = validator();
      if (shouldStop) {
        clearInterval(timer);

        return resolve(true);
      }
    }, interval);
  });
}
