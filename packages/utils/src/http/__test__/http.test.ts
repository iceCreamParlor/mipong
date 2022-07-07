import axios from "axios";
import { AxiosHttpClient } from "../http-client/axios";
import { HttpClient } from "../http-client/types/HttpClient";
import { HttpMethod } from "../http-client/types/HttpMethod";

describe("http TEST", () => {
  const client: HttpClient = new AxiosHttpClient();
  it("COOKIE TEST", async () => {
    await client.request({
      url: "https://www.naver.com/",
      method: HttpMethod.GET,
      payload: null,
      headers: {},
      options: {},
    });

    // await client.get("https://www.naver.com/");
  });
});
