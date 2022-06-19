import { AnyConstructor } from "../../types";

type OnErrorOption = {
  callback: (e: Error, self: any, args: any) => any;
  matchErrors?: AnyConstructor[];
  catchError?: boolean;
};

export function OnError(option: OnErrorOption): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const { callback, matchErrors = [Error], catchError = false } = option;
    const originalFunction = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalFunction.apply(this, args);
      } catch (e: any) {
        const errorMatched = matchErrors.some((error) => e instanceof error);

        if (!errorMatched) {
          throw e;
        }

        await callback.apply(this, [e as Error, this, args]);

        if (!catchError) {
          throw e;
        }
      }
    };
  };
}
