import { HttpClient } from "../types";
import { CommonCookieManager } from "./CommonCookieManager";
import { CommonCookieParser } from "./CommonCookieParser";
import { CommonCookieStore } from "./CommonCookieStore";
import { CommonHttpClient } from "./CommonHttpClient";
import { CommonHttpTemplate } from "./CommonHttpTemplate";

export function createCommonHttpTemplate(withCookieStore = true) {
  const client: HttpClient = new CommonHttpClient();
  const cookieStore = new CommonCookieStore();
  const cookieParser = new CommonCookieParser();
  const cookieManager = new CommonCookieManager(cookieStore, cookieParser);

  return withCookieStore
    ? new CommonHttpTemplate(client, cookieManager)
    : new CommonHttpTemplate(client);
}
