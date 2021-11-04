import { RouteComponentProps } from "react-router";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { apiUrl } from "../App";
import { Link } from "react-router-dom";
import { setConstantValue } from "typescript";

const Home: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const [billingKey, setBillingKey] = useState(
    "HuQh7DpY37VwJJ4OuwOJiJS-A2L2RLVRJsaNy6rup10="
  );
  const [paymentKey, setPaymentKey] = useState("");
  let [cardNumber, setCardNumber] = useState("");
  let [cardExpirationYear, setCardExpirationYear] = useState("");
  let [cardExpirationMonth, setCardExpirationMonth] = useState("");
  let [cardPassword, setCardPassword] = useState("");
  let [customerBirthday, setCustomerBirthday] = useState("");
  let [customerKey, setCustomerKey] = useState("");

  const apiAxios = axios.create({
    baseURL: apiUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const requestSubscription = async () => {
    console.log(billingKey);
    const param = {
      billingKey: billingKey,
      amount: 8900,
      customerKey: "hjkim@wiselyshave.com",
      orderId: `${Math.floor(Math.random() * 10000000)}`,
      customerEmail: "heejjeeh@gmail.com",
      customerName: "김희재",
      orderName: "리필면도날",
      taxFreeAmount: 0,
    };
    const result = await apiAxios.post(
      "/api/payments/toss/subscription",
      param
    );
    console.log(result);
  };

  const cancelOrder = async () => {
    const result = await apiAxios.post("/api/payments/toss/cancelPayment", {
      paymentKey,
    });
    console.log(result);
  };

  const requestKeyInBillingKey = async () => {
    const param = {
      cardNumber,
      cardExpirationMonth,
      cardExpirationYear,
      customerBirthday,
      customerKey,
      cardPassword,
    };
    const result = await apiAxios.post(
      "/api/payments/toss/getKeyInBillingKey",
      param
    );
    console.log(result);
  };

  const setBillingKeyValue = (e: ChangeEvent) => {
    console.log(e.target);
  };

  return (
    <>
      <p>Home</p>

      <div>
        <p>네이버페이</p>
        <Link to="/naverpay/onetime">
          <button>네이버페이 일회구매</button>
        </Link>
        <Link to="/naverpay/subscription">
          <button>네이버페이 정기구매</button>
        </Link>
      </div>

      <div>
        <p>카카오페이</p>
        <Link to="/kakaopay/onetime">
          <button>Kakaopay 일회결제</button>
        </Link>
        <Link to="/kakaopay/subscription">
          <button>Kakaopay 정기결제</button>
        </Link>
      </div>
      <div>
        <p>토스</p>
        <Link to="/toss/onetime">
          <button>Toss 일회구매</button>
        </Link>
        <Link to="/toss/vbank">
          <button>Toss 무통장입금</button>
        </Link>
        <Link to="/toss/phone">
          <button>Toss 휴대폰</button>
        </Link>
        <Link to="/toss/subscription">
          <button>Toss 정기구매(빌링키 발급)</button>
        </Link>
        <div>
          <form>
            <input
              name="billingKey"
              onChange={(e) => setBillingKey(e.target.value)}
              value={billingKey}
              type="text"
            />
            <button onClick={requestSubscription} type="button">
              정기결제
            </button>
          </form>
        </div>
        <div>
          <form>
            <input
              name="paymentKey"
              onChange={(e) => setPaymentKey(e.target.value)}
              value={paymentKey}
              type="text"
            />
            <button onClick={cancelOrder} type="button">
              환불하기
            </button>
          </form>
        </div>
        <div>
          <p>Toss 키인 빌링키 발급</p>
          <form>
            <input
              name="cardNumber"
              onChange={(e) => setCardNumber(e.target.value)}
              value={cardNumber}
              placeholder="cardNumber"
            />
            <input
              name="cardExpirationYear"
              onChange={(e) => setCardExpirationYear(e.target.value)}
              value={cardExpirationYear}
              placeholder="cardExpirationYear"
            />
            <input
              name="cardExpirationMonth"
              onChange={(e) => setCardExpirationMonth(e.target.value)}
              value={cardExpirationMonth}
              placeholder="cardExpirationMonth"
            />
            <input
              name="cardPassword"
              onChange={(e) => setCardPassword(e.target.value)}
              value={cardPassword}
              placeholder="cardPassword"
            />
            <input
              name="customerBirthday"
              onChange={(e) => setCustomerBirthday(e.target.value)}
              value={customerBirthday}
              placeholder="customerBirthday"
            />
            <input
              name="customerKey"
              onChange={(e) => setCustomerKey(e.target.value)}
              value={customerKey}
              placeholder="customerKey"
            />
            <button onClick={requestKeyInBillingKey} type="button">
              키인 빌링키 발급
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
