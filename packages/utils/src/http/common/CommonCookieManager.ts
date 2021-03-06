import { Cookie, CookieStore, HttpResponse } from "../types";
import { CookieManager } from "../types/CookieManager";
import { CookieParser } from "../types/CookieParser";

export class CommonCookieManager implements CookieManager {
  constructor(
    private _cookieStore: CookieStore,
    private _cookieParser: CookieParser
  ) {}

  parse(response: HttpResponse): Cookie[] {
    return this._cookieParser.parse(response);
  }

  async getCookieHeader(url: string) {
    const cookies = await this._cookieStore.getCookiesBy(url);

    return cookies.reduce((ac, cv) => `${ac}${cv.key}=${cv.value};`, "");
  }

  async getCookie(url: string, name: string): Promise<Cookie> {
    const cookie = await this._cookieStore.getCookie(url, name);
    if (!cookie) {
      throw new Error("Cookie Not Exists");
    }

    return cookie;
  }
  async getCookies(url: string) {
    return await this._cookieStore.getCookiesBy(url);
  }

  async setCookie(url: string, cookie: Cookie): Promise<void> {
    await this._cookieStore.setCookie(url, cookie);
  }
  async setCookies(url: string, cookie: Cookie[]): Promise<void> {
    await this._cookieStore.setCookies(url, cookie);
  }
}
