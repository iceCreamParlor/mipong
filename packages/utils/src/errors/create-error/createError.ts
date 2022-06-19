/**
 * 하나의 함수로 다양한 에러타입을 생성해주는 함수이다.
 * @param errors
 * @param seperator
 */
export function generateCreateErrorWithSeparator<
  T extends readonly string[],
  S extends string
>(
  errors: T,
  seperator: S
): {
  [Key in T[number] as Key extends `${infer Name}${S}${string}`
    ? `${Name}`
    : Key extends `${infer Name}`
    ? Name
    : never]: ErrorConstructor;
} {
  return errors.reduce((ac, cv) => {
    const [errorName, message] = cv.split(seperator);
    return {
      ...ac,
      [errorName]: class extends Error {
        constructor(msg = message ?? "") {
          super(msg);
        }
      },
    };
  }, {} as any);
}

/**
 * seperator 를 통해 createError 를 생성해 주는 함수
 * @param separator
 */
export function generateCreateError<S extends string>(separator: S) {
  return function <T extends readonly string[]>(errors: T) {
    return generateCreateErrorWithSeparator(errors, separator);
  };
}
/**
 * 하나의 함수로 다양한 에러타입을 생성해주는 함수이다.
 *
 * ```typescript
 *  const { TestError, TestError2 } = createError([
 *     "TestError: 테스트 에러 메세지",
 *     "TestError2",
 *  ] as const);
 * ```
 */
export const createError = generateCreateError(": ");
