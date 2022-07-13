/**
 * 지정한 lefts, right 텍스트를 [포함하지 않는] 사이의 텍스트를 반환한다.
 *
 * @example
 * innerText('동해물과 백두산이 마르고 닳도록, 백두산이 손발이 닳도록', '백두산이', '닳도록')
 * // return [' 마르고 ', ' 손발이 ']
 * @param target 가공 대상 텍스트.
 * @param left 검색 시작 텍스트
 * @param right 검색 종료 텍스트, 원하는 output 텍스트 내부에 동일한 right가 포함되지 않도록 주의해야 한다.
 */
export function extractInnerTexts(
  target: string,
  left: string,
  right: string
): string[] {
  const extractedTexts = [];
  let offset = 0;

  while (target.includes(left) && target.includes(right)) {
    const startIdx = target.indexOf(left, offset);
    const endIdx = target.indexOf(right, startIdx);

    if (startIdx === -1 || endIdx === -1) {
      break;
    }

    const extractedText = target.substring(startIdx + left.length, endIdx);

    extractedTexts.push(extractedText);
    offset = endIdx + right.length;
  }

  return extractedTexts;
}
