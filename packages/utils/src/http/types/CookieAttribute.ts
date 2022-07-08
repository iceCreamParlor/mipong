export type SameSite = "Lax" | "Strict" | "None";

export interface CookieAttribute {
  maxAge?: number;
  domain: string;
  path?: string;
  expires?: Date;
  sameSite?: SameSite;
  secure?: boolean;
  httpOnly?: boolean;
}
