import { HttpClient } from "../types/HttpClient";
import { HttpRequest } from "../types/HttpRequest";
import { HttpResponse } from "../types/HttpResponse";
import axios, { AxiosResponse } from "axios";
import iconv from "iconv-lite";
import R from "ramda";
import { OriginalCharset } from "../types/ClientOptions";

export class AxiosHttpClient implements HttpClient {
  private _client = axios.create();
  async request(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requestInfo = this.parseRequestInfo(httpRequest);

    console.log(requestInfo);

    const rawResponse = await this._client.request({
      ...requestInfo,
      responseType: "arraybuffer",
    });
    const responseHeaders = this.parseResponseHeaders(rawResponse);
    const responseBody = this.parseBody(httpRequest, rawResponse);
    const statusCode = rawResponse.status;
    const isRedirect = [301, 302].includes(statusCode);

    console.log({
      body: responseBody,
      header: responseHeaders,
      code: statusCode,
      isRedirect,
    });

    return {
      body: responseBody,
      header: responseHeaders,
      code: statusCode,
      isRedirect,
    };
  }

  private parseRequestInfo(httpRequest: HttpRequest) {
    const requestBody =
      typeof httpRequest.payload === "string"
        ? httpRequest.payload
        : JSON.stringify(httpRequest.payload);
    return {
      url: httpRequest.url,
      method: httpRequest.method,
      headers: {
        "Content-Length": Buffer.byteLength(requestBody),
        ...httpRequest.headers,
      },
      payload: requestBody,
    };
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
  private parseBody(httpRequest: HttpRequest, rawResponse: AxiosResponse) {
    const { options } = httpRequest;
    return options.originalCharset === OriginalCharset.EUC_KR
      ? iconv.decode(rawResponse.data, "EUC-KR").toString()
      : rawResponse.data.toString();
  }
}
