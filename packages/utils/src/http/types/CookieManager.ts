import { Cookie } from "./Cookie";
import { HttpResponse } from "./HttpResponse";

export interface CookieManager {
  /**
   * 쿠키를 가져 온다.
   * @param url - url 정보
   * @param name
   */
  getCookie(url: string, name: string): Promise<Cookie>;

  /**
   * 해당 url의 모든 쿠키를 가져온다.
   * @param url
   */
  getCookies(url: string): Promise<Cookie[]>;

  /**
   * 쿠키를 셋팅한다.
   * @param cookie
   */
  setCookie(url: string, cookie: Cookie): Promise<void>;

  /**
   * 쿠키를 셋팅한다.
   * @param cookie
   */
  setCookies(url: string, cookies: Cookie[]): Promise<void>;

  getCookieHeader(url: string): Promise<string>;

  parse(response: HttpResponse): Cookie[];
}
