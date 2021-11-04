import axios from "axios";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { apiUrl } from "../App";
import { loadScript } from "../lib/misc";
import {
  getClientId,
  getMode,
  getOnetimeChainId,
  getSubscriptionChainId,
} from "../lib/naverpay";

const NaverpaySubscription: React.FC = (props) => {
  const match = useRouteMatch();
  const userKey = `${Math.floor(Math.random() * 10000000)}`;
  const payKey = `${Math.floor(Math.random() * 10000000)}`;
  const orderId = 5062780;
  const paymentId = 10;

  const jwt = `eyJhbGciOiJSUzI1NiIsInR5cCI6IlJTMjU2IiwicmVnRGF0ZSI6MTYzNTkyMjQxOTcwOH0.eyJVTklEIjoxMDAwMDkzOSwiRW1haWwiOiJoamtpbSsxMTAzMUB3aXNlbHlzaGF2ZS5jb20iLCJGdWxsTmFtZSI6Iuq5gO2drOyerCIsIkRPQiI6Ijk0MDcwOCIsIlBob25lIjoiMDEwODkxNDA4ODYiLCJHZW5kZXIiOiJNIiwiQWdyZWVOb3RpZmljYXRpb25zIjoiTiIsIlBheWluZ0N1c3RvbWVyIjoiTiIsIlN1YnNjcmlwdGlvblN0YXR1cyI6IlgiLCJJc1ZlcmlmaWVkRW1haWwiOiJOIiwiSXNWZXJpZmllZFBob25lIjoiTiIsIlVzZXJUeXBlIjoi7J2867CY7ZqM7JuQIiwiU3VwcG9ydFNraXBDeWNsZSI6Ik4iLCJMYXN0TG9nZ2VkSW5EYXRlIjoiMjAyMS0xMS0wM1QwNjo1MzoxMi4wMDBaIiwiTW9kaWZpZWREYXRlIjpudWxsLCJSZWdEYXRlIjoiMjAyMS0xMS0wM1QwNjo1MzoxMi4wMDBaIiwicGFzc3dvcmRFeGlzdHMiOnRydWUsImlhdCI6MTYzNTkyMjQxOSwiZXhwIjoxNjUwNDM3NjE5LCJzdWIiOiJoamtpbSsxMTAzMUB3aXNlbHlzaGF2ZS5jb20ifQ.QS-NXMc4RvQiNBAj_x08icH8rYIRLoggRsKpnA86mu5Y5tpy4_ApwRlHR2Hi1urSrcaBRzAuIY4A5uoPgWLJgVGa29TFOHcaOX-NbwsJjhJ6eZuU7beFHlrs3nl8iwE0W_pVXHdur5Jm602QwOH0kLtMNa_FXrbvKO2U4_WQjkESU-OoDQy9a2eBO0w4mQg1jxquOxEMadfnRP1QYS5x7UtndukJqqX8YdJQOYe1IzQjn4nPy1qtsLNjPI9_aXwPACpRmvVy4hqoSl3fsWk2hgpHkCWbOgDd1kO0HLbloiuuw9h_zqz4bjthwy--XVGvnhMVcdWTzVNHBrRe8FuQNw`;

  const getNaverPayments = async () => {
    const result = await axios.post(
      `${apiUrl}/payments/billing-key/ready/naverpay`,
      {
        orderId,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return result.data.data;
  };

  useEffect(() => {
    console.log(getClientId());
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
        getNaverPayments().then((res) => {
          const reserveId = res.body.reserveId;
          console.log(reserveId);
          loadScript("https://nsp.pay.naver.com/sdk/js/naverpay.min.js").then(
            () => {
              const oPay = (window as any).Naver.Pay.create({
                mode: "development",
                payType: "recurrent",
                clientId: getClientId(),
              }).open(reserveId);
              // const elNaverPayBtn = document.getElementById("naverPayBtn");
              // if (elNaverPayBtn) {
              //   elNaverPayBtn.addEventListener("click", function () {
              //     oPay.open({
              //       // Pay Reserve Parameters를 참고 바랍니다.
              //       actionType: "NEW",
              //       recurrentId: "20210725YWtoak5IelFibjhtN2IrNHhmZkZvWUhRanVBPQ==",
              //       //actionType값이 "CHANGE"이면 현재 사용하고 있는 정기/반복결제 등록 번호(recurrentId)값을 전달합니다.
              //       // actionType값이 "CHANGE"이고 targetRecurrentId값이 등록되어 있는 정기/반복결제 등록 번호이면, 등록 완료 후 새로운 정기/반복결제 등록 번호가 발급되고 targetRecurrentId값에 해당하는 정기/반복결제는 해지됩니다
              //       // targetRecurrentId: "",
              //       productCode: "12345",
              //       productName: "리필면도날",
              //       totalPayAmount: 8900,
              //       returnUrl: "http://localhost:3000/api/payment/naverpay",
              //     });
              //   });
              // }
            }
          );
        });
      });
  }, []);

  return (
    <>
      <p>Naverpay Onetime</p>
      <input
        type="button"
        id="naverPayBtn"
        value="네이버페이 결제 버튼"
      ></input>
    </>
  );
};

export default NaverpaySubscription;
