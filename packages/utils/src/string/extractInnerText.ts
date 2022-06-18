/**
 * 지정한 lefts, right 텍스트를 [포함하지 않는] 사이의 텍스트를 반환한다.
 *
 * @example
 * innerText('동해물과 백두산이 마르고 닳도록', ['백두산이'], '닳도록')
 * // return ' 마르고 '
 * @param target 가공 대상 텍스트.
 * @param lefts 검색 시작 텍스트, 여러 depth를 지정해서 보다 정확한 지점을 지정할 수 있다.
 * @param right 검색 종료 텍스트, 원하는 output 텍스트 내부에 동일한 right가 포함되지 않도록 주의해야 한다.
 */
export function extractInnerText(
  target: string,
  lefts: string[],
  right: string
): string {
  let beforeStartIdx = -1;
  let startIdx = -1;
  for (const left of lefts) {
    startIdx = target.indexOf(left, beforeStartIdx);

    if (startIdx < 0) {
      break;
    }

    startIdx += left.length;
    beforeStartIdx = startIdx;
  }

  const endIdx = target.indexOf(right, startIdx);
  if (startIdx < 0 || endIdx < 0) {
    return "";
  }

  return target.substring(startIdx, endIdx);
}
