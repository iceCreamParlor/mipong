import { loadTossPayments } from "@tosspayments/sdk";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { apiUrl } from "../App";
import { getTossClientKey } from "../lib/toss";

const Toss: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const clientKey = getTossClientKey();

  useEffect(() => {
    const getTossPayments = async () => {
      const tossPayments = await loadTossPayments(clientKey);
      tossPayments.requestPayment("카드", {
        amount: 8900,
        orderId: `WS202107281533566E84B36190AC4B88`,
        orderName: "면도기 세트",
        customerName: "김희재",
        successUrl: apiUrl + "/payments/onetime/callback/toss",
        failUrl: apiUrl + "/api/payments/toss/onetime/fail",
      });
    };
    getTossPayments();
  }, []);

  return (
    <>
      <script src="https://js.tosspayments.com/v1"></script>
      <p>toss</p>
    </>
  );
};

export default Toss;
