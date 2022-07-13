export interface CookieAttribute {
  maxAge?: number;
  domain: string;
  path?: string | null;
  expires?: Date;
  sameSite?: string;
  secure?: boolean;
  httpOnly?: boolean;
}
