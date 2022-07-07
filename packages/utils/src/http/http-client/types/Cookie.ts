import { CookieAttribute } from "./CookieAttribute";

export interface Cookie {
  name: string;
  value: string;
  attribute: CookieAttribute;
}
