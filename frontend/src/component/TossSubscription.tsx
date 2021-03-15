import { loadTossPayments } from "@tosspayments/sdk";
import { useEffect } from "react";
import { apiUrl } from "../App";

const TossSubscription = (props: any) => {
  const clientKey = process.env.REACT_APP_TOSS_CLIENT_ID;
  console.log(`client Key : ${clientKey}`);

  if (!clientKey) {
    throw new Error("Toss Client Key Not exists");
  }

  useEffect(() => {
    const getTossPayments = async () => {
      const tossPayments = await loadTossPayments(clientKey);
      tossPayments.requestBillingAuth("카드", {
        customerKey: "hjkim@wiselyshave.com",
        successUrl: apiUrl + "/api/payments/toss/subscription/success",
        failUrl: apiUrl + "/api/payments/toss/subscription/fail",
      });
    };
    getTossPayments();
  }, []);

  return <>Toss Subscription</>;
};

export default TossSubscription;
