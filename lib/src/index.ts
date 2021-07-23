import { Mipong } from "./payments";

export { Payment, Mipong } from "./payments";
export { Iamport } from "./payments/iamport";
export { KakaoPay } from "./payments/kakaopay";
export { NaverPay } from "./payments/naverpay";
export { NicePay } from "./payments/nicepay";
export { TossPayments } from "./payments/toss-payments";
export { TossPay } from "./payments/tosspay";

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
