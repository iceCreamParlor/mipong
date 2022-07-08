import { CookieStore } from "../types/CookieStore";
import { HttpClient } from "../types/HttpClient";
import { HttpMethod } from "../types/HttpMethod";
import { HttpResponse } from "../types/HttpResponse";
import { HttpTemplate, ParameterType } from "../types/HttpTemplate";
import { HttpOptions, OriginalCharset } from "../types/HttpOptions";
import { RedirectType } from "../types/RedirectType";
import { HttpRequest } from "../types/HttpRequest";

export class CommonHttpTemplate implements HttpTemplate {
  constructor(
    private _httpClient: HttpClient,
    private _cookieStore: CookieStore
  ) {}
  async post(
    url: string,
    parameter: ParameterType,
    options?: Partial<HttpOptions>
  ): Promise<HttpResponse> {
    return this._httpClient.request(
      this.makeHttpRequest(url, HttpMethod.POST, parameter, options)
    );
  }

  async put(
    url: string,
    parameter: ParameterType,
    options?: Partial<HttpOptions> | undefined
  ): Promise<HttpResponse> {
    return this._httpClient.request(
      this.makeHttpRequest(url, HttpMethod.PUT, parameter, options)
    );
  }
  async patch(
    url: string,
    parameter: ParameterType,
    options?: Partial<HttpOptions> | undefined
  ): Promise<HttpResponse> {
    return this._httpClient.request(
      this.makeHttpRequest(url, HttpMethod.PATCH, parameter, options)
    );
  }
  get(
    url: string,
    options?: Partial<HttpOptions> | undefined
  ): Promise<HttpResponse> {
    return this._httpClient.request(
      this.makeHttpRequest(url, HttpMethod.GET, null, options)
    );
  }
  delete(
    url: string,
    options?: Partial<HttpOptions> | undefined
  ): Promise<HttpResponse> {
    return this._httpClient.request(
      this.makeHttpRequest(url, HttpMethod.DELETE, null, options)
    );
  }
  head(
    url: string,
    options?: Partial<HttpOptions> | undefined
  ): Promise<HttpResponse> {
    return this._httpClient.request(
      this.makeHttpRequest(url, HttpMethod.HEAD, null, options)
    );
  }
  options(
    url: string,
    options?: Partial<HttpOptions> | undefined
  ): Promise<HttpResponse> {
    return this._httpClient.request(
      this.makeHttpRequest(url, HttpMethod.OPTIONS, null, options)
    );
  }
  getCookieStore(): CookieStore | undefined {
    throw new Error("Method not implemented.");
  }

  private makeHttpRequest(
    url: string,
    method: HttpMethod,
    parameter: ParameterType,
    options?: Partial<HttpOptions>
  ): HttpRequest {
    return {
      url,
      headers: options?.headers ?? {},
      method,
      payload: parameter,
      options: this.makeOptions(options),
    };
  }

  private makeOptions(options?: Partial<HttpOptions>): HttpOptions {
    const defaultOptions: HttpOptions = {
      headers: {},
      originalCharset: OriginalCharset.UTF8,
      redirectType: RedirectType.VIA_SYSTEM_MODULE,
      timeoutMs: 10 * 1000,
    };

    return {
      ...defaultOptions,
      ...options,
    };
  }
}
