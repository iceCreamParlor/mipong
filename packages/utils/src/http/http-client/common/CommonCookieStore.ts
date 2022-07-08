import { Cookie } from "../types/Cookie";
import { CookieStore } from "../types/CookieStore";

export class CommonCookieStore implements CookieStore {
  private _cookies: Cookie[];
  setCookie(cookie: Cookie): void {
    this.setCookies([cookie]);
  }
  setCookies(cookies: Cookie[]): void {
    this._cookies = [...this._cookies, ...cookies];
  }
  getCookie(url: string, name: string): Cookie | undefined {
    return this.getCookiesBy(url).find((cookie) => cookie.name === name);
  }
  getCookies(): Cookie[] {
    return this._cookies;
  }
  getCookiesBy(url: string): Cookie[] {
    return this.getCookies().filter((cookie) =>
      url.includes(cookie.attribute.domain)
    );
  }
  clear(): void {
    this._cookies = [];
  }
}
