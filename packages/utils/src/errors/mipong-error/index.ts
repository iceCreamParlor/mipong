import { createError } from "../create-error/createError";

export const { MipongError } = createError([
  "MipongError: 문제가 발생하였습니다",
] as const);
