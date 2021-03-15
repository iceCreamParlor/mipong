import { RouteComponentProps } from "react-router";

const OrderComplete: React.FC<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const params = new URLSearchParams(props.location.search);
  const pg = params.get("pg");
  let orderCid = params.get("orderCid");
  let paymentKey = params.get("paymentKey");
  return pg === "toss" ? (
    <div>
      toss
      <div>PaymentKey : {paymentKey}</div>
      <div>OrderCID : {orderCid}</div>
    </div>
  ) : (
    <>not known</>
  );
};

export default OrderComplete;
