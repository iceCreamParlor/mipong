import { loadTossPayments } from "@tosspayments/sdk";
import { useEffect } from "react";
import { apiUrl } from "../App";
import { getTossClientKey } from "../lib/toss";

const TossVBank: React.FC = (props) => {
  const clientKey = getTossClientKey();

  console.log(props);
  useEffect(() => {
    const getTossPayments = async () => {
      const tossPayments = await loadTossPayments(clientKey);

      const orderId = `WS20210728144005D67DAFFF25834BC1`;

      tossPayments.requestPayment("가상계좌", {
        amount: 8900,
        orderId,
        orderName: "면도기 (무통장입금)",
        customerName: "김희재",
        successUrl: apiUrl + `/payments/onetime/callback/toss`,
        failUrl: apiUrl + "/api/payments/toss/vbank/fail",
      });
    };
    getTossPayments();
  }, []);

  return (
    <>
      <script src="https://js.tosspayments.com/v1"></script>
      <p>토스 무통장입금</p>
    </>
  );
};

export default TossVBank;
