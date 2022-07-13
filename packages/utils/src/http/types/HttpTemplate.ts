import FormData from "form-data";
import { CookieManager } from "./CookieManager";

import { HttpOptions } from "./HttpOptions";
import { HttpResponse } from "./HttpResponse";

export type ParameterType =
  | Record<string, any>
  | Buffer
  | FormData
  | string
  | null;

/**
 * HttpClient를 편하게 쓰기 위한 Helper Class
 */
export interface HttpTemplate {
  post(
    url: string,
    parameter: ParameterType,
    options?: Partial<HttpOptions>
  ): Promise<HttpResponse>;
  put(
    url: string,
    parameter: ParameterType,
    options?: Partial<HttpOptions>
  ): Promise<HttpResponse>;
  patch(
    url: string,
    parameter: ParameterType,
    options?: Partial<HttpOptions>
  ): Promise<HttpResponse>;
  get(url: string, options?: Partial<HttpOptions>): Promise<HttpResponse>;
  delete(url: string, options?: Partial<HttpOptions>): Promise<HttpResponse>;
  head(url: string, options?: Partial<HttpOptions>): Promise<HttpResponse>;
  options(url: string, options?: Partial<HttpOptions>): Promise<HttpResponse>;
  getCookieManager(): CookieManager | undefined;
}

export interface HttpTemplateWithCookieManager extends HttpTemplate {
  getCookieManager(): CookieManager;
}
