import { Cookie } from "./Cookie";
import { HttpResponse } from "./HttpResponse";

export interface CookieParser {
  /**
   * 문자열 쿠키를 Cookie 클래스로 파싱합니다.
   * 도메인별 쿠키 관리를 위해 url 정보가 필요합니다.
   * @param rawCookie response header의 set-cookie 문자열
   * @param url @see CookieAttribute 의 domain값
   */
  parse(response: HttpResponse): Cookie[];
}
