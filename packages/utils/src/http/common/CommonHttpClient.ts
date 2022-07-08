import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import iconv from "iconv-lite";
import R from "ramda";
import { HTTP } from "../constant";
import { HttpClient } from "../types/HttpClient";
import { HttpOptions, OriginalCharset } from "../types/HttpOptions";
import { HttpRequest } from "../types/HttpRequest";
import { HttpResponse } from "../types/HttpResponse";
import { RedirectType } from "../types/RedirectType";

export class CommonHttpClient implements HttpClient {
  private _client = axios.create();

  async request(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requestInfo = this.makeAxiosRequest(httpRequest);

    console.log("==========[REQUEST INFO]==========");
    console.log(JSON.stringify(requestInfo, null, 2));

    const rawResponse = await this._client.request(requestInfo);
    const response = this.makeResponse(rawResponse, httpRequest.options);

    console.log("==========[RESPONSE INFO]==========");
    console.log(JSON.stringify(response, null, 2));

    return response;
  }

  private makeResponse(
    response: AxiosResponse<any, any>,
    options: HttpOptions
  ): HttpResponse {
    const responseHeaders = this.parseResponseHeaders(response);
    const responseBody = this.parseBody(response, options);
    const statusCode = response.status;
    const isRedirect = [301, 302].includes(statusCode);

    return {
      body: responseBody,
      code: statusCode,
      isRedirect,
      header: responseHeaders,
    };
  }

  private makeAxiosRequest(httpRequest: HttpRequest): AxiosRequestConfig {
    const { url, method, headers } = httpRequest;

    const payload = this.makePayload(httpRequest);

    return {
      url,
      method,
      headers: {
        "Content-Length": Buffer.byteLength(payload),
        ...headers,
      },
      data: payload,
      responseType: "arraybuffer" as any,
      maxRedirects:
        httpRequest.options.redirectType === RedirectType.NONE
          ? 0
          : HTTP.MAX_REDIRECT_COUNT,
      timeout: httpRequest.options.timeoutMs ?? HTTP.MAX_REQUEST_TIMEOUT,
      validateStatus: (status) => true,
    };
  }

  private makePayload(httpRequest: HttpRequest) {
    if (!httpRequest.payload) {
      return "";
    }

    return typeof httpRequest.payload === "string"
      ? httpRequest.payload
      : JSON.stringify(httpRequest.payload);
  }

  private parseResponseHeaders(rawResponse: AxiosResponse) {
    return R.flatten(
      Object.entries(rawResponse.headers)
        .filter(([key, value]) => key != null || value != null)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return value.map((v: any) => ({ [key]: v }));
          }
          return [{ [key]: value }];
        })
    );
  }
  private parseBody(rawResponse: AxiosResponse, options: HttpOptions) {
    return options.originalCharset === OriginalCharset.EUC_KR
      ? iconv.decode(rawResponse.data, "EUC-KR").toString()
      : rawResponse.data.toString();
  }
}
