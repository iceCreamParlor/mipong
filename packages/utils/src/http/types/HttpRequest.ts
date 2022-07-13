import { HttpOptions } from "./HttpOptions";
import { HttpMethod } from "./HttpMethod";
import { ParameterType } from "./HttpTemplate";

export interface HttpRequest {
  url: string;
  method: HttpMethod;
  payload: ParameterType;
  headers: Record<string, string | number | boolean>;
  options: HttpOptions;
}
