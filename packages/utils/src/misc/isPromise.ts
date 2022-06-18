export function isPromise(target: any): target is Promise<any> {
  return (
    target instanceof Promise ||
    (typeof target?.then === "function" && typeof target?.catch === "function")
  );
}
