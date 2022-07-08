import { Cookie } from "./Cookie";

export interface CookieStore {
  setCookie(cookie: Cookie): void;
  setCookies(cookies: Cookie[]): void;
  getCookie(url: string, name: string): Cookie | undefined;
  getCookies(): Cookie[];
  getCookiesBy(url: string): Cookie[];
  clear(): void;
}
