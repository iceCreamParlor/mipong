import { CookieManager } from "../types/CookieManager";
import { HttpClient } from "../types/HttpClient";
import { HttpMethod } from "../types/HttpMethod";
import { HttpOptions, OriginalCharset } from "../types/HttpOptions";
import { HttpRequest } from "../types/HttpRequest";
import { HttpResponse } from "../types/HttpResponse";
import { HttpTemplate, ParameterType } from "../types/HttpTemplate";
import { RedirectType } from "../types/RedirectType";

export class CommonHttpTemplate implements HttpTemplate {
  constructor(
    private _httpClient: HttpClient,
    private _cookieManager?: CookieManager
  ) {}

  async post(
    url: string,
    parameter: ParameterType,
    options?: Partial<HttpOptions>
  ): Promise<HttpResponse> {
    return this.doRequest(
      this.makeHttpRequest(url, HttpMethod.POST, parameter, options)
    );
  }

  async put(
    url: string,
    parameter: ParameterType,
    options?: Partial<HttpOptions> | undefined
  ): Promise<HttpResponse> {
    return this.doRequest(
      this.makeHttpRequest(url, HttpMethod.PUT, parameter, options)
    );
  }
  async patch(
    url: string,
    parameter: ParameterType,
    options?: Partial<HttpOptions> | undefined
  ): Promise<HttpResponse> {
    return this.doRequest(
      this.makeHttpRequest(url, HttpMethod.PATCH, parameter, options)
    );
  }
  get(
    url: string,
    options?: Partial<HttpOptions> | undefined
  ): Promise<HttpResponse> {
    return this.doRequest(
      this.makeHttpRequest(url, HttpMethod.GET, null, options)
    );
  }
  delete(
    url: string,
    options?: Partial<HttpOptions> | undefined
  ): Promise<HttpResponse> {
    return this.doRequest(
      this.makeHttpRequest(url, HttpMethod.DELETE, null, options)
    );
  }
  head(
    url: string,
    options?: Partial<HttpOptions> | undefined
  ): Promise<HttpResponse> {
    return this.doRequest(
      this.makeHttpRequest(url, HttpMethod.HEAD, null, options)
    );
  }
  options(
    url: string,
    options?: Partial<HttpOptions> | undefined
  ): Promise<HttpResponse> {
    return this.doRequest(
      this.makeHttpRequest(url, HttpMethod.OPTIONS, null, options)
    );
  }
  getCookieManager(): CookieManager | undefined {
    return this._cookieManager;
  }

  private async doRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const response = await this._httpClient.request(httpRequest);
    if (this._cookieManager) {
      const cookies = this._cookieManager.parse(response);
      this._cookieManager.setCookies(response.url, cookies);
    }

    return response;
  }

  private makeHttpRequest(
    url: string,
    method: HttpMethod,
    parameter: ParameterType,
    options?: Partial<HttpOptions>
  ): HttpRequest {
    return {
      url,
      headers: {
        ...(options?.headers ?? {}),
        ...(this._cookieManager
          ? {
              Cookie: this._cookieManager.getCookieHeader(url),
            }
          : {}),
      },
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
