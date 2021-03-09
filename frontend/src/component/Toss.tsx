import { loadTossPayments } from "@tosspayments/sdk";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { apiUrl } from "../App";

const Toss: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const clientKey = process.env.REACT_APP_TOSS_CLIENT_ID;
  console.log(`client Key : ${clientKey}`);

  if (!clientKey) {
    throw new Error("Toss Client Key Not exists");
  }

  useEffect(() => {
    const getTossPayments = async () => {
      const tossPayments = await loadTossPayments(clientKey);
      tossPayments.requestPayment("카드", {
        amount: 8900,
        orderId: "698501",
        orderName: "면도기 세트",
        customerName: "김희재",
        successUrl: apiUrl + "/api/payments/toss/onetime/success",
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
