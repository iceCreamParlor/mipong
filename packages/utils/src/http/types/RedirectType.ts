import { HttpOptions } from "./HttpOptions";

export enum RedirectType {
  /**
   * NodeJS인 경우 Axios에서 처리
   */
  VIA_SYSTEM_MODULE = "VIA_SYSTEM_MODULE",

  /**
   * redirect 사용 안함
   */
  NONE = "NONE",
}

export const defaultHttpOptions: HttpOptions = {
  redirectType: RedirectType.VIA_SYSTEM_MODULE,
};
