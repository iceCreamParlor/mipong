export type AnyFunction = (...args: any[]) => any;
export type AnyAsyncFunction = (...args: any[]) => Promise<any>;
export type AnyConstructor = new (...args: any[]) => any;
export type DecoratorFunction = (
  target: any,
  key: string,
  descriptor?: PropertyDescriptor
) => any;
