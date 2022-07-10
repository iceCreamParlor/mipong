import ToughCookie from "tough-cookie";
import { Cookie, HttpResponse } from "../types";
import { CookieParser } from "../types/CookieParser";

export class CommonCookieParser implements CookieParser {
  parse(response: HttpResponse): Cookie[] {
    return response.header
      .filter((header) => Boolean(header["Set-Cookie"] ?? header["set-cookie"]))
      .map((header) =>
        ToughCookie.parse(header["Set-Cookie"] ?? header["set-cookie"])
      )
      .filter((cookie) => Boolean(cookie))
      .map((cookie) => {
        if (!cookie) {
          throw new Error("Cookie Not Exist");
        }
        return cookie;
      });
  }
}
