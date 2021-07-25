import { Mipong } from "./payments";

export { Payment, Mipong } from "./payments";
export { Iamport } from "./payments/iamport";
export { KakaoPay } from "./payments/kakaopay";
export { NaverPay } from "./payments/naverpay";
export { NicePay } from "./payments/nicepay";
export { TossPayments } from "./payments/toss-payments";
export { TossPay } from "./payments/tosspay";

const naverpay = Mipong.getNaverPay();
const paymentId = "20210725NP1003002918";
// naverpay
//   .approveOnetime({
//     paymentId,
//   })
//   .then((response) => {
//     console.log(response.data);
//   });

// naverpay
//   .cancelPayment(
//     {
//       paymentId,
//       cancelAmount: 8900,
//       cancelReason: "고객 요청",
//       cancelRequester: 1,
//       taxScopeAmount: 0,
//       taxExScopeAmount: 8900,
//       doCompareRest: 1,
//     },
//     "onetime"
//   )
//   .then((response) => console.log(response));

naverpay
  .registerSubscription({
    actionType: "NEW",
    //actionType값이 "CHANGE"이면 현재 사용하고 있는 정기/반복결제 등록 번호(recurrentId)값을 전달합니다.
    // actionType값이 "CHANGE"이고 targetRecurrentId값이 등록되어 있는 정기/반복결제 등록 번호이면, 등록 완료 후 새로운 정기/반복결제 등록 번호가 발급되고 targetRecurrentId값에 해당하는 정기/반복결제는 해지됩니다
    // targetRecurrentId: "",
    productCode: "12345",
    productName: "리필면도날",
    totalPayAmount: 8900,
    returnUrl: "http://localhost:3000/api/payment/naverpay",
  })
  .then((response) => console.log(response.data));

// naverpay
//   .getPayment(
//     {
//       paymentId,
//     },
//     "onetime"
//   )
//   .then((response) => console.log(JSON.stringify(response)));

// const kakaopay = Mipong.getKakaoPay();

// kakaopay
//   .ready(
//     {
//       // 가맹점 주문번호, 최대 100자
//       partner_order_id: "12345",
//       // 가맹점 회원id, 최대 100자
//       partner_user_id: "698500",
//       // 상품명, 최대 100자
//       item_name: "테스트",
//       // 상품 수량
//       quantity: 1,
//       // 상품 총액
//       total_amount: 10000,
//       // 상품 비과세 금액
//       tax_free_amount: 0,
//       approval_url: "localhost:3000",
//       // 결제 취소 시 redirect url, 최대 255자
//       cancel_url: "localhost:3000",
//       // 결제 실패 시 redirect url, 최대 255자
//       fail_url: "localhost:3000",
//     },
//     "onetime"
//   )
//   .then((readyResponse) => {
//     console.log(JSON.stringify(readyResponse));
//     if (readyResponse.success) {
//       console.log(readyResponse.data.tid);
//       console.log(readyResponse.data.android_app_scheme);
//     }
//   });
