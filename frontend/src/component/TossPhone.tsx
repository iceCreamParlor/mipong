import { loadTossPayments } from "@tosspayments/sdk";
import { useEffect } from "react";
import { getTossClientKey } from "../lib/toss";

const TossPhone: React.FC = (props) => {
  const clientKey = getTossClientKey();

  useEffect(() => {
    const getTossPayments = async () => {
      const tossPayments = await loadTossPayments(clientKey);
      tossPayments.requestPayment("휴대폰", {
        amount: 15000,
        orderId: "p2qnm2oxJ4vctvBiPzWau",
        orderName: "토스 티셔츠 외 2건",
        customerName: "박토스",
        successUrl: window.location.origin + "/success",
        failUrl: window.location.origin + "/fail",
      });
    };
    getTossPayments();
  }, []);

  return (
    <>
      <script src="https://js.tosspayments.com/v1"></script>
      <p>토스 핸드폰 소액결제</p>
    </>
  );
};

export default TossPhone;
