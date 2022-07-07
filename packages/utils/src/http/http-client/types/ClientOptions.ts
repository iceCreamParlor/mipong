export interface ClientOptions {
  originalCharset?: OriginalCharset;
}
/**
 * Response에서 받을 데이터의 인코딩 힌트를 App으로 전달한다.
 */
export enum OriginalCharset {
  UTF8 = "UTF-8",
  EUC_KR = "EUC-KR",
}
