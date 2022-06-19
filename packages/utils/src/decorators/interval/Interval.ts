import { isPromise } from "../../misc";
import { AnyFunction } from "../../types";

export type IntervalOption = {
  timeout: number;
  until: (self: any, args: any[]) => boolean;
  maxCount?: number;
};
export function Interval(option: IntervalOption): MethodDecorator {
  const { timeout, until, maxCount = Infinity } = option;

  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    let count = 0;
    const originalMethod: AnyFunction = descriptor.value;

    descriptor.value = function (...args: any[]) {
      return new Promise((resolve, reject) => {
        const _setInterval = setInterval(() => {
          const result = originalMethod.apply(this, args);
          const isValid = until.apply(this, [this, args]);
          if (!isValid || ++count >= maxCount) {
            clearInterval(_setInterval);
            return isPromise(result) ? result.then(resolve) : resolve(result);
          }
        }, timeout);
      });
    };
  };
}
