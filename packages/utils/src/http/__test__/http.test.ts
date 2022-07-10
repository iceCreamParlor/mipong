import { createCommonHttpTemplate } from "../common/createCommonHttpTemplate";
import { OriginalCharset } from "../types";

jest.setTimeout(60 * 1000);

describe("http TEST", () => {
  const httpTemplate = createCommonHttpTemplate();

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

    // await httpTemplate.post(
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

    await httpTemplate
      .getCookieManager()
      ?.setCookie("https://www.tworld.co.kr", {
        key: "TWDJSESSIONID",
        value: "400964AB47430D08A211676323E7B94E.jks_twdServer33",
        httpOnly: true,
        domain: null,
        // domain: "tworld.com",
      });

    await httpTemplate.get(
      "https://www.tworld.co.kr/normal.do?viewId=V_MYTW0136&serviceId=SDUMMY0001",
      {
        originalCharset: OriginalCharset.EUC_KR,
      }
    );

    await httpTemplate.get(
      "https://www.tworld.co.kr/normal.do?viewId=V_MYTW0136&serviceId=SDUMMY0001",
      {
        originalCharset: OriginalCharset.EUC_KR,
      }
    );

    // await client.get("https://www.naver.com/");
  });
});
