import { Cookie } from "./Cookie";

export interface CookieStore {
  setCookie(url: string, cookie: Cookie): Promise<void>;
  setCookies(url: string, cookies: Cookie[]): Promise<void>;
  getCookie(url: string, name: string): Promise<Cookie | undefined>;
  getCookiesBy(url: string): Promise<Cookie[]>;
  clear(): void;
}
