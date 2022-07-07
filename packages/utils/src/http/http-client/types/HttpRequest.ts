import { ClientOptions } from "./ClientOptions";
import { HttpMethod } from "./HttpMethod";

export interface HttpRequest {
  url: string;
  method: HttpMethod;
  payload: Record<string, any> | FormData | Buffer | string | null;
  headers: Record<string, string | number | boolean>;
  options: ClientOptions;
}
