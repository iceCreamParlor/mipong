import { HttpRequest } from "./HttpRequest";
import { HttpResponse } from "./HttpResponse";

export interface HttpClient {
  request(httpRequest: HttpRequest): Promise<HttpResponse>;
}
