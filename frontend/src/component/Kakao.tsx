import axios from "axios";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { apiUrl } from "../App";

interface ReadyKakaoProps {
  type: "onetime" | "subscription";
}

const Kakao = ({ type, match }: any) => {
  const [nextRedirectPcUrl, setNextRedirectPcUrl] = useState(null);
  const [tid, setTid] = useState(null);

  const orderId = 5062778;

  const jwt = `eyJhbGciOiJSUzI1NiIsInR5cCI6IlJTMjU2IiwicmVnRGF0ZSI6MTYzNTk5MzI0NDQ2N30.eyJVTklEIjoxMDAwMDkzOSwiRW1haWwiOiJoamtpbSsxMTAzMUB3aXNlbHlzaGF2ZS5jb20iLCJGdWxsTmFtZSI6Iuq5gO2drOyerCIsIkRPQiI6Ijk0MDcwOCIsIlBob25lIjoiMDEwODkxNDA4ODYiLCJHZW5kZXIiOiJNIiwiQWdyZWVOb3RpZmljYXRpb25zIjoiTiIsIlBheWluZ0N1c3RvbWVyIjoiWSIsIlN1YnNjcmlwdGlvblN0YXR1cyI6IlgiLCJJc1ZlcmlmaWVkRW1haWwiOiJOIiwiSXNWZXJpZmllZFBob25lIjoiTiIsIlVzZXJUeXBlIjoi7J2867CY7ZqM7JuQIiwiU3VwcG9ydFNraXBDeWNsZSI6Ik4iLCJMYXN0TG9nZ2VkSW5EYXRlIjoiMjAyMS0xMS0wNFQwMTowMzoxMi4wMDBaIiwiTW9kaWZpZWREYXRlIjpudWxsLCJSZWdEYXRlIjoiMjAyMS0xMS0wM1QwNjo1MzoxMi4wMDBaIiwicGFzc3dvcmRFeGlzdHMiOnRydWUsImlhdCI6MTYzNTk5MzI0NCwiZXhwIjoxNjUwNTA4NDQ0LCJzdWIiOiJoamtpbSsxMTAzMUB3aXNlbHlzaGF2ZS5jb20ifQ.L1TUjMe-bXelNHtnjnk3CLxEX9s85aWAKR9hkYjBgaBua_aNIYqWORpvjwyHHTYhw-AIsK4UJ9He-XAZncduO1iDudLQi-gWo6iciooJHi5UXU_-9zQHXTjabV_ahQuG04792ynSY2MJNYsiSrtqfR-qZnRGklnYxi_jD9MVfgFboWEjC3NjGQArMbE0uAZ9LtrOSUdhPuNI5KwRtvsAOAxy1Nr1H71mSSSKYpWiclxPheoPsB6LQfmIKgyvCzqx3YD27lceQVCWc4o6aEorqPtr5Lnc_DsHq91XTzXeyllQF8jk1Jxg9CHEJ3VB3pAR15UnipLnVcjD1nF0iSbJdA`;
  const paymentId = type === "onetime" ? 1 : 7;

  useEffect(() => {
    const fetchReadyResponse = async () => {
      const requestUrl =
        type === "onetime"
          ? `${apiUrl}/payments/onetime/kakaopay`
          : `${apiUrl}/payments/billing-key/ready/kakaopay`;

      return (
        await axios.post(
          requestUrl,
          {
            orderId,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
      ).data;
    };

    axios
      .post(
        `${apiUrl}/payments/set`,
        {
          orderId,
          paymentId,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        fetchReadyResponse().then((res) => {
          setNextRedirectPcUrl(res.data.next_redirect_pc_url);
          // console.log(`set tid : ${res.tid}`);
          // setTid(res.tid);
          // axios.get(`${apiUrl}/api/payments/kakao/setTid?tid=${res.tid}`);
          // .then(() => (document.location.href = res.next_redirect_pc_url));
        });
      });
  }, []);

  return (
    <>
      {JSON.stringify(nextRedirectPcUrl)}
      {nextRedirectPcUrl ? (
        <iframe width="500" height="500" src={nextRedirectPcUrl!}></iframe>
      ) : (
        "loading..."
      )}
    </>
  );
};

export default Kakao;
