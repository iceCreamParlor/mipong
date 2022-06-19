import { AnyConstructor, AnyFunction } from "../../types";

type RetryOption = {
  times?: number;
  matchErrors?: AnyConstructor[];
  onEachError?: (e: Error, self: any, args: any[]) => void;
};

/**
 * Retry 데코레이터를 사용하면, async 함수로 변경된다.
 * @param options
 * @constructor
 */
export function Retry(options: RetryOption): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const { times = 100, matchErrors = [Error], onEachError } = options;
    const originalMethod: AnyFunction = descriptor.value;
    let counter = 0;

    descriptor.value = async function (...args: any[]) {
      while (times > counter++) {
        try {
          return await originalMethod.apply(this, args);
        } catch (e) {
          const errorMatched = matchErrors.some((error) => e instanceof error);
          if (!errorMatched) {
            throw e;
          }

          await onEachError?.apply(this, [e as Error, this, args]);

          if (times === counter) {
            throw e;
          }
        }
      }
    };
  };
}
