import ToughCookie from "tough-cookie";
import { Cookie } from "../types/Cookie";
import { CookieStore } from "../types/CookieStore";

export class CommonCookieStore implements CookieStore {
  private _cookieJar = new ToughCookie.CookieJar();

  async setCookie(url: string, cookie: Cookie): Promise<void> {
    const cookieString = ToughCookie.fromJSON(JSON.stringify(cookie));
    this._cookieJar.setCookie(cookieString, url);
  }
  async setCookies(url: string, cookies: Cookie[]): Promise<void> {
    await Promise.all(cookies.map((cookie) => this.setCookie(url, cookie)));
  }
  async getCookie(url: string, name: string): Promise<Cookie | undefined> {
    return (await this.getCookiesBy(url)).find((cookie) => cookie.key === name);
  }

  async getCookiesBy(url: string): Promise<Cookie[]> {
    const cookies = await this._cookieJar.getCookies(
      ToughCookie.canonicalDomain(url)
    );

    return cookies.map((cookie) => ({
      key: cookie.key,
      value: cookie.value,
      maxAge: cookie.maxAge,
      domain: cookie.domain,
      path: cookie.path,
      expires: cookie.expires,
      secure: cookie.secure,
      httpOnly: cookie.httpOnly,
    }));
  }
  clear(): void {
    this._cookieJar.removeAllCookiesSync();
  }
}
