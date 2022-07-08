import { RedirectType } from "./RedirectType";

export interface HttpOptions {
  headers?: Record<string, any> | Array<Record<string, any>>;
  originalCharset?: OriginalCharset;
  redirectType?: RedirectType;
  timeoutMs?: number;
}
/**
 * Response에서 받을 데이터의 인코딩 힌트를 App으로 전달한다.
 */
export enum OriginalCharset {
  UTF8 = "UTF-8",
  EUC_KR = "EUC-KR",
}
