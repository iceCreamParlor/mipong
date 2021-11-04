import { loadTossPayments } from "@tosspayments/sdk";
import axios from "axios";
import { useEffect } from "react";
import { apiUrl } from "../App";

const TossSubscription = (props: any) => {
  const clientKey = process.env.REACT_APP_TOSS_CLIENT_ID;
  console.log(`client Key : ${clientKey}`);

  if (!clientKey) {
    throw new Error("Toss Client Key Not exists");
  }

  const jwt = `eyJhbGciOiJSUzI1NiIsInR5cCI6IlJTMjU2IiwicmVnRGF0ZSI6MTYzNTkyMjQxOTcwOH0.eyJVTklEIjoxMDAwMDkzOSwiRW1haWwiOiJoamtpbSsxMTAzMUB3aXNlbHlzaGF2ZS5jb20iLCJGdWxsTmFtZSI6Iuq5gO2drOyerCIsIkRPQiI6Ijk0MDcwOCIsIlBob25lIjoiMDEwODkxNDA4ODYiLCJHZW5kZXIiOiJNIiwiQWdyZWVOb3RpZmljYXRpb25zIjoiTiIsIlBheWluZ0N1c3RvbWVyIjoiTiIsIlN1YnNjcmlwdGlvblN0YXR1cyI6IlgiLCJJc1ZlcmlmaWVkRW1haWwiOiJOIiwiSXNWZXJpZmllZFBob25lIjoiTiIsIlVzZXJUeXBlIjoi7J2867CY7ZqM7JuQIiwiU3VwcG9ydFNraXBDeWNsZSI6Ik4iLCJMYXN0TG9nZ2VkSW5EYXRlIjoiMjAyMS0xMS0wM1QwNjo1MzoxMi4wMDBaIiwiTW9kaWZpZWREYXRlIjpudWxsLCJSZWdEYXRlIjoiMjAyMS0xMS0wM1QwNjo1MzoxMi4wMDBaIiwicGFzc3dvcmRFeGlzdHMiOnRydWUsImlhdCI6MTYzNTkyMjQxOSwiZXhwIjoxNjUwNDM3NjE5LCJzdWIiOiJoamtpbSsxMTAzMUB3aXNlbHlzaGF2ZS5jb20ifQ.QS-NXMc4RvQiNBAj_x08icH8rYIRLoggRsKpnA86mu5Y5tpy4_ApwRlHR2Hi1urSrcaBRzAuIY4A5uoPgWLJgVGa29TFOHcaOX-NbwsJjhJ6eZuU7beFHlrs3nl8iwE0W_pVXHdur5Jm602QwOH0kLtMNa_FXrbvKO2U4_WQjkESU-OoDQy9a2eBO0w4mQg1jxquOxEMadfnRP1QYS5x7UtndukJqqX8YdJQOYe1IzQjn4nPy1qtsLNjPI9_aXwPACpRmvVy4hqoSl3fsWk2hgpHkCWbOgDd1kO0HLbloiuuw9h_zqz4bjthwy--XVGvnhMVcdWTzVNHBrRe8FuQNw`;
  const orderId = 5062765;
  const ordercid = "WS202111041004438948AF6EAF6947E3";

  const unid = 10000939;
  const paymentId = 12;

  useEffect(() => {
    const getTossPayments = async () => {
      const tossPayments = await loadTossPayments(clientKey);
      tossPayments.requestBillingAuth("카드", {
        customerKey: `${unid}`,
        successUrl:
          apiUrl +
          `/payments/billing-key/register-and-pay/toss?ordercid=${ordercid}`,
        failUrl: apiUrl + "/payments/redirect/fail",
      });
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
        getTossPayments();
      });
  }, []);

  return <>Toss Subscription</>;
};

export default TossSubscription;
