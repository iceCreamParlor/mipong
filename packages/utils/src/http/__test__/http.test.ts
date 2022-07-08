import { CommonCookieStore } from "../common/CommonCookieStore";
import { CommonHttpClient } from "../common/CommonHttpClient";
import { CommonHttpTemplate } from "../common/CommonHttpTemplate";
import { HttpClient } from "../types/HttpClient";
import { HttpTemplate } from "../types/HttpTemplate";

jest.setTimeout(60 * 1000);

describe("http TEST", () => {
  const client: HttpClient = new CommonHttpClient();
  const httpTemplate: HttpTemplate = new CommonHttpTemplate(
    client,
    new CommonCookieStore()
  );
  it("COOKIE TEST", async () => {
    // const result = await client.request({
    //   url: "https://kim.heejae.info/api/auth/login",
    //   method: HttpMethod.POST,
    //   payload: JSON.stringify({
    //     username: "heejjeeh@gmail.com",
    //     password: "gmlwo12!@",
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   options: {},
    // });
    // await httpTemplate.get("https://naver.com");

    // const result = await axios.post(
    //   "https://kim.heejae.info/api/auth/login",
    //   JSON.stringify({
    //     username: "heejjeeh@gmail.com",
    //     password: "gmlwo12!@",
    //   }),
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    const result = await httpTemplate.get(
      "https://www.skt-id.co.kr/member/identification/findId.do",
      {}
    );

    // const result = await httpTemplate.post(
    //   "https://kim.heejae.info/api/auth/login",
    //   JSON.stringify({
    //     username: "heejjeeh@gmail.com",
    //     password: "gmlwo12!@",
    //   }),
    //   {
    //     headers: {
    //       // "Content-Type": "application/json",
    //       Referer: "https://kim.heejae.info/post/dev",
    //       "User-Agent": "PostmanRuntime/7.29.0",
    //     },
    //   }
    // );

    console.log(result);

    // await client.get("https://www.naver.com/");
  });
});
