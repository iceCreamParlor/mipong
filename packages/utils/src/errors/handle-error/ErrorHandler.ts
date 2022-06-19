import { BooleanFunction, NeverFunction } from "../../types";
import { MipongError } from "../mipong-error";

type WhenClause = Boolean | BooleanFunction;

export class ErrorHandler {
  private _errorQueue: [WhenClause, NeverFunction][] = [];
  private _buffer: WhenClause | null = null;

  private constructor() {}

  static create() {
    return new ErrorHandler() as Pick<ErrorHandler, "when">;
  }

  static when(whenClause: WhenClause) {
    return ErrorHandler.create().when(whenClause);
  }

  when(whenClause: WhenClause) {
    this._buffer = whenClause;

    return this as Pick<this, "then">;
  }

  then(thenClause: NeverFunction) {
    if (this._buffer === null) {
      throw new MipongError("whenClause 가 비어있습니다");
    }
    this._errorQueue.push([this._buffer, thenClause]);

    return this as Pick<this, "when" | "execute">;
  }

  execute(message?: any) {
    for (let [whenClause, thenClause] of this._errorQueue) {
      const whenClauseResult =
        typeof whenClause === "function" ? whenClause() : whenClause;
      if (whenClauseResult) {
        thenClause(message);
      }
    }
  }
}
