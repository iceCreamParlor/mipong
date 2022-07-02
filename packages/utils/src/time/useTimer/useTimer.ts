import { isPromise } from "../../misc";
import { AnyFunction, BooleanFunction, VoidFunction } from "../../types";

type Storage = {
  isExpired: boolean;
  timer?: NodeJS.Timeout;
};

const storage: Storage = {
  isExpired: false,
  timer: undefined,
};

export function useTimer(params: {
  callback?: AnyFunction;
  timeout?: number;
}): [BooleanFunction, VoidFunction] {
  const { callback = () => undefined, timeout = 60 * 1000 } = params;

  const isExpired: () => boolean = () => storage.isExpired;

  const resetTimer = () => {
    resetTimeout({
      callback,
      timeout,
    });
  };

  return [isExpired, resetTimer];
}

function startTimeout(params: { callback: AnyFunction; timeout: number }) {
  const { callback, timeout } = params;
  resetStorage();

  return setTimeout(() => {
    try {
      const result = callback();
      isPromise(result) ? result.then(expire) : expire();
    } catch (e) {
      resetStorage();
      expire();
      throw e;
    }
  }, timeout);
}

function resetTimeout(params: { callback: AnyFunction; timeout: number }) {
  if (storage.timer) {
    clearTimeout(storage.timer);
  }

  startTimeout(params);
}

function resetStorage() {
  storage.isExpired = false;
}

function expire() {
  storage.isExpired = true;
  storage.timer = undefined;
}
