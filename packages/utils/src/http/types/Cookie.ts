export interface Cookie {
  key: string;
  value: string;
  maxAge?: number | "Infinity" | "-Infinity";
  domain: string | null;
  path?: string | null;
  expires?: Date | "Infinity";
  sameSite?: string;
  secure?: boolean;
  httpOnly?: boolean;
}
