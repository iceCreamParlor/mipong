import { useEffect } from "react";
import { useRouteMatch } from "react-router";

const NaverpayOnetime: React.FC = (props) => {
  const match = useRouteMatch();
  const partnerId = process.env.REACT_APP_NAVERPAY_PARTNER_ID;
  const clientId = process.env.REACT_APP_NAVERPAY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_NAVERPAY_CLIENT_SECRET;
  const onetimeChainId = process.env.REACT_APP_NAVERPAY_ONETIME_CHAIN_ID;
  const subscriptionChainId =
    process.env.REACT_APP_NAVERPAY_SUBSCRIPTION_CHAIN_ID;
  const mode = "development";
  const userKey = `${Math.floor(Math.random() * 10000000)}`;
  const payKey = `${Math.floor(Math.random() * 10000000)}`;

  useEffect(() => {
    console.log("!!");
  }, []);

  return (
    <>
      {/* <script src="https://nsp.pay.naver.com/sdk/js/naverpay.min.js"></script> */}

      <script
        src="https://nsp.pay.naver.com/sdk/js/naverpay.min.js"
        data-client-id={clientId}
        data-mode={mode}
        data-merchant-user-key={userKey}
        data-merchant-pay-key={payKey}
        data-product-name="리필면도날"
        data-total-pay-amount="8900"
        data-tax-scope-amount="0"
        data-tax-ex-scope-amount="0"
        data-return-url="http://localhost:8080/api/payment/naverpay"
      ></script>
      <p>Naverpay Onetime</p>
      <input
        type="button"
        id="naverPayBtn"
        value="네이버페이 결제 버튼"
      ></input>
      <script>
        {/* var oPay = Naver.Pay.create({ //SDK Parameters를 참고 바랍니다.
          "mode" : "{#_mode}",
          "clientId": "{#_clientId}"
          //"chainId" : "{그룹형일 경우 chainId를 넣어주세요}"
    });

    var elNaverPayBtn = document.getElementById("naverPayBtn");

    elNaverPayBtn.addEventListener("click", function() {
        oPay.open({ // Pay Reserve Parameters를 참고 바랍니다.
          "merchantUserKey": "{#_merchantUserKey}",
          "merchantPayKey": "{#_merchantPayKey}",
          "productName": "{#_productName}",
          "totalPayAmount": {#_totalPayAmount},
          "taxScopeAmount": {#_taxScopeAmount},
          "taxExScopeAmount": {#_taxExScopeAmount},
          "returnUrl": "{#_returnUrl}"
        });
    }); */}
      </script>
    </>
  );
};

export default NaverpayOnetime;
