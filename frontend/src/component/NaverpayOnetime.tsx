import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { loadScript } from "../lib/misc";
import { getClientId, getMode, getOnetimeChainId } from "../lib/naverpay";

const NaverpayOnetime: React.FC = (props) => {
  const match = useRouteMatch();
  const userKey = `${Math.floor(Math.random() * 10000000)}`;
  const payKey = `${Math.floor(Math.random() * 10000000)}`;

  useEffect(() => {
    loadScript("https://nsp.pay.naver.com/sdk/js/naverpay.min.js").then(() => {
      const oPay = (window as any).Naver.Pay.create({
        mode: getMode(),
        clientId: getClientId(),
        chainId: getOnetimeChainId(),
      });
      const elNaverPayBtn = document.getElementById("naverPayBtn");
      if (elNaverPayBtn) {
        elNaverPayBtn.addEventListener("click", function () {
          oPay.open({
            // Pay Reserve Parameters를 참고 바랍니다.
            merchantUserKey: userKey,
            merchantPayKey: payKey,
            productName: "리필면도날",
            totalPayAmount: 8900,

            taxScopeAmount: 0,
            taxExScopeAmount: 8900,
            returnUrl: "http://localhost:8080/api/payment/naverpay",
          });
        });
      }
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

export default NaverpayOnetime;
