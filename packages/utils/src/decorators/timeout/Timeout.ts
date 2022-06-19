import { isPromise } from "../../misc";
import { AnyFunction } from "../../types";

export type TimeoutOption = {
  timeout: number;
};
export function Timeout(option: TimeoutOption): MethodDecorator {
  const { timeout } = option;

  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod: AnyFunction = descriptor.value;

    descriptor.value = function (...args: any[]) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("TIMEOUT FINISH");
          const result = originalMethod.apply(this, args);
          return isPromise(result) ? result.then(resolve) : resolve(result);
        }, timeout);
      });
    };
  };
}
