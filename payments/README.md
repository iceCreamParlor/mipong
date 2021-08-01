## @mipong/payments

<br/>

Typescript 를 위한 결제 라이브러리.

Typescript로 strict 하게 쓰여진 결제 라이브러리입니다. 카카오페이, 네이버페이, 토스페이, 토스페이먼츠(PG), 나이스페이먼츠를 손쉽게 개발할 수 있습니다. 결제사별로 결제 플로우는 다르지만, @mipong/payments 는 결제사가 달라도 일관된 함수들로 결제 로직을 작성하게 도와줍니다.

<pre>
  <code>
approveOnetime() : 단건결제 가맹점 승인
approveSubscription() : 정기결제 가맹점 승인
registerSubscription() : 정기결제 수단 등록 
getPayment() : 결제 내역 조회 
cancelPayment() : 결제 취소
  </code>
</pre>

<br/>

---

<br/>

## 목차

- [시작하기](#payment-start)
  - [카카오페이](#kakaopay)
  - [네이버페이](#naverpay)
  - [토스페이먼츠](#toss-payments)
  - [토스페이](#tosspay)
  - [나이스페이먼츠](#nicepay)

<br/>

---

## 시작하기 <span id="payment-start"></span>

<br/>

#### 1. 환경 변수 주입 (가맹점 키, 시크릿 키)

<pre>
  <code>
// process.env 에 다음과 같은 값을 주입시킵니다. 
// (사용하지 않는 PG 는 제외)
  
// 카카오페이 
KAKAOPAY_ADMIN_KEY="..."
KAKAOPAY_SUBSCRIPTION_CID="..."

// 네이버페이 
NAVERPAY_PARTNER_ID="..."
NAVERPAY_CLIENT_SECRET="..."
NAVERPAY_SUBSCRIPTION_CHAIN_ID="..."

// 토스페이먼츠 (PG)
TOSS_SECRET_KEY="..."

// 토스페이
TOSSPAY_API_KEY="..."

// 나이스페이먼츠
NICEPAY_MERCHANT_ID="..."
NICEPAY_MERCHANT_KEY="..."
  </code>
</pre>

#### 2. 결제사에 맞는 코드 구현

<pre>
  <code>
const kakaopay = Mipong.getKakaoPay();
const response: KakaoPayRegisterSubscriptionResponse = await kakaopay.registerSubscription({
  partner_order_id: orderId,
  partner_user_id: unid,
  item_name: itemName,
  quantity: 1,
  total_amount: 10000,
  tax_free_amount: 0,
  approval_url: approveUrl,
  cancel_url: cancelUrl,
  fail_url: failUrl,
});
if(response.success === true) {
  /*! 자동으로 카카오페이에서 지정한 response 가 Type 추론 및 자동완성 됩니다. */
  /**!
    *   HTTP/1.1 200 OK
    *   Content-Type: application/json;charset=UTF-8
    *   {
    *     "tid":"T9876543210987654321",
    *     "next_redirect_app_url":"https://mockup-pg-web.kakao.com/v1/xxxxxxxxxx/aInfo",
    *     "next_redirect_mobile_url":"https://mockup-pg-web.kakao.com/v1/xxxxxxxxxx/mInfo",
    *     "next_redirect_pc_url":"https://mockup-pg-web.kakao.com/v1/xxxxxxxxxx/info",
    *     "android_app_scheme":"kakaotalk://kakaopay/pg?url=https://mockup-pg-web.kakao.com/* v1/xxxxxxxxxx/order",
    *     "ios_app_scheme":"kakaotalk://kakaopay/pg?url=https://mockup-pg-web.kakao.com/v1/* xxxxxxxxxx/order",
    *     "created_at":"2020-06-18T14:35:11"
    *     }
    *
    */
  console.log(`결제 고유 번호 : ${response.data.tid}`);
}
if(response.success === false) {
  /*! 자동으로 카카오페이에서 지정한 에러가 Type 추론 및 자동완성 됩니다. */
  console.log(`에러 메세지 : ${response.msg}`)
}
  </code>
</pre>
<br/>

---

### 카카오페이 <span id="kakaopay"></span>

<br/>

https://developers.kakao.com/docs/latest/ko/kakaopay/common

- 단건 결제
  - [결제 요청](#kakaopay-ready-onetime)
  - [결제 승인](#kakaopay-approve-onetime)
- 정기 결제
  - [정기 결제 고유번호 발급](#kakaopay-register-subscription)
  - [정기 결제 시작](#kakaopay-approve-subscription)
  - [정기 결제 비활성화](#kakaopay-inactivate-subscription)
  - [정기 결제 상태 조회](#kakaopay-check-subscription)
- 공통
  - [주문 조회](#kakaopay-get-payment)
  - [결제 취소](#kakaopay-cancel-payment)

<br/>

---

### 카카오페이 코드 예시

> - 단건 결제
>   - 결제 요청 <span id="kakaopay-ready-onetime"></span>
>   <pre>
>     <code>
>   Mipong.getKakaoPay().ready(
>     {
>       // 가맹점 주문번호, 최대 100자
>       partner_order_id: "...",
>       // 가맹점 회원id, 최대 100자
>       partner_user_id: "...",
>       // 상품명, 최대 100자
>       item_name: "...",
>       // 상품 수량
>       quantity: 1,
>       // 상품 총액
>       total_amount: 10000,
>       // 상품 비과세 금액
>       tax_free_amount: 0,
>       approval_url: "...",
>       // 결제 취소 시 redirect url, 최대 255자
>       cancel_url: "...",
>       // 결제 실패 시 redirect url, 최대 255자
>       fail_url: "...",
>     },
>     "onetime"
>   )
>   .then((response) => {
>     if(response.success) {
>       return ...
>     }
>     if(!response.success) {
>       return ...
>     }
>   });
>     </code>
>   </pre>
>   - 결제 승인 <span id="kakaopay-approve-onetime"></span>
>   <pre>
>     <code>
>   Mipong.getKakaoPay().approveOnetime({
>     tid,
>     partner_order_id: "...",
>     partner_user_id: "...",
>     pg_token: "...",
>   })
>   .then((response) => {
>     if(response.success) {
>       return ...
>     }
>     if(!response.success) {
>       return ...
>     }
>   });
>     </code>
>   </pre>
> - 정기 결제
>   - 정기 결제 고유번호 발급 <span id="kakaopay-register-subscription"></span>
>   <pre>
>     <code>
>   Mipong.getKakaoPay().registerSubscription(
>     {
>       // 가맹점 주문번호, 최대 100자
>       partner_order_id: "...",
>       // 가맹점 회원id, 최대 100자
>       partner_user_id: "...",
>       // 상품명, 최대 100자
>       item_name: "...",
>       // 상품 수량
>       quantity: 1,
>       // 상품 총액
>       total_amount: 10000,
>       // 상품 비과세 금액
>       tax_free_amount: 0,
>       approval_url: "...",
>       // 결제 취소 시 redirect url, 최대 255자
>       cancel_url: "...",
>       // 결제 실패 시 redirect url, 최대 255자
>       fail_url: "...",
>     },
>     "subscription"
>   )
>   .then((response) => {
>    if(response.success) {
>      return ...
>    }
>    if(!response.success) {
>      return ...
>     }
>   });
>     </code>
>   </pre>
>   - 정기 결제 요청 <span id="kakaopay-approve-subscription"></span>
>   <pre>
>     <code>
>   const response = await Mipong.getKakaoPay().approveSubscription({
>     tid,
>     partner_order_id: "...",
>     partner_user_id: "...",
>     pg_token: "...",
>   })
>   if(response.success) {
>     ...
>   }
>     </code>
>   </pre>
>   - 정기 결제 비활성화 <span id="kakaopay-inactivate-subscription"></span>
>   <pre>
>     <code>
>   const response = await Mipong.getKakaoPay().inactivateSubscription({
>     sid: "...",
>   })
>   if(response.success) {
>     ...
>   }
>     </code>
>   </pre>
>   - 정기 결제 상태 조회 <span id="kakaopay-check-subscription"></span>
>   <pre>
>     <code>
>   const response = await Mipong.getKakaoPay().checkSubscription({
>     sid: "...",
>   })
>   if(response.success) {
>     ...
>   }
>     </code>
>   </pre>
> - 주문 조회 <span id="kakaopay-get-payment"></span>
>   <pre>
>     <code>
>   const response = await Mipong.getKakaoPay().getPayment({
>       tid: "...",
>     },
>     // 단건결제 : "onetime" | 정기결제 : "subscription"
>     "onetime"
>   )
>   if(response.success) {
>     ...
>   }
>     </code>
>   </pre>
> - 결제 취소 <span id="kakaopay-cancel-payment"></span>
>     <pre>
>       <code>
>   const response = await Mipong.getKakaoPay().cancelPayment({
>       /*! 결제 고유번호 */
>       tid: string;
>       /*! 취소 금액 */
>       cancel_amount: number;
>       /*! 취소 비과세 금액 */
>       cancel_tax_free_amount: number;
>       /*! 취소 부과세 금액, 디폴트 : (취소 금액 - 취소 비과세 금액)/11, 소숫점이하 반올림) */
>       cancel_vat_amount?: number;
>       /*! 취소 가능 금액(결제 취소 요청 금액 포함) */
>       cancel_available_amount?: number;
>       /*! 해당 요청에 대해 저장하고 싶은 값, 최대 200자 */
>       payload?: string;
>     },
>     // 단건결제 : "onetime" | 정기결제 : "subscription"
>     "onetime"
>   )
>   if(response.success) {
>     ...
>   }
>       </code>
>     </pre>
>   <br/>

<br/>

---

<br/>

### 네이버페이 <span id="naverpay"></span>

https://developer.pay.naver.com/docs/v2/api#common-common_certi

> - 간편결제 플랫폼
>   - [결제 승인](#naverpay-approve-onetime)
> - 정기/반복결제 플랫폼
>   - [등록 완료](#naverpay-register-subscription)
>   - [등록 해지](#naverpay-inactivate-subscription)
>   - [등록 내역 조회](#naverpay-check-subscription)
>   - [결제 예약](#naverpay-reserve-subscription)
>   - [결제 승인](#naverpay-approve-subscription)
> - 공통
>   - [결제 취소](#naverpay-cancel-payment)
>   - [결제 내역 조회](#naverpay-get-payment)

<br/>

---

<br/>

#### 코드 예시

> - 간편결제 플랫폼
>   - 결제 승인 <span id="naverpay-approve-onetime"></span>
>     <pre>
>     <code>
>     const response = await Mipong.getNaverPay().approveOnetime({
>       paymentId: string,
>     })
>     if(response.success) {
>       ...
>     }
>     </code>
>     </pre>
>     <br/>
> - 정기/반복결제 플랫폼
>   - 등록 완료 <span id="naverpay-register-subscription"></span>
>     <pre>
>     <code>
>     const response = await Mipong.getNaverPay().registerSubscription({
>          actionType: "NEW" | "CHANGE";
>          targetRecurrentId?: string;
>          productCode: string;
>          productName: string;
>          totalPayAmount: number;
>          returnUrl: string;
>      })
>     if(response.success) {
>     ...
>     }
>     </code>
>     </pre>
>     <br/>
>   - 등록 해지 <span id="naverpay-inactivate-subscription"></span>
>     <pre>
>     <code>
>     const response = await Mipong.getNaverPay().inactivateSubscription({
>          /*! 해지할 정기/반복결제 등록 번호 */
>          recurrentId: string;
>          /*! 해지 요청자(1: 구매자, 2: 가맹점 관리자) */
>          /*! 구분하기 어려우면 가맹점 관리자로 입력합니다 */
>          expireRequester: 1 | 2;
>          /*! 해지 사유 */
>          expireReason: string;
>      })
>     if(response.success) {
>     ...
>     }
>     </code>
>     </pre>
>     <br/>
>   - 등록 내역 조회 <span id="naverpay-check-subscription"></span>
>     <pre>
>     <code>
>     const response = await Mipong.getNaverPay().checkSubscription({
>          /*! 조회하고자 하는 정기/반복결제 등록 번호 */
>          /*! 정기/반복결제 등록번호를 입력값으로 선택하면 startTime, endTime, pageNumber, rowsPerPage 파라미터       값은 무시됩니다 */
>          recurrentId?: string;
>          /*! 등록 시작 일시(YYYYMMDDHH24MMSS) */
>          /*! 검색 기간(startTime과 endTime 사이의 시간)은 31일 이내여야 합니다 */
>          startTime?: string;
>          /*! 등록 종료 일시(YYYYMMDDHH24MMSS) */
>          /*! 검색 기간(startTime과 endTime 사이의 시간)은 31일 이내여야 합니다 */
>          endTime?: string;
>          /*! VALID: 유효, EXPIRED: 만료, ALL: 전체값이 없으면 ALL로 간주합니다 */
>          state?: "VALID" | "EXPIRED" | "ALL";
>          /*! 조회하고자 하는 페이지번호 */
>          /*! 값이 없으면 1로 간주합니다 */
>          pageNumber?: number;
>          /*! 페이지 당 row 건수 */
>          /*! 1~100까지 지정 가능하며, 값이 없으면 20으로 간주합니다 */
>          rowsPerPage?: number;
>      })
>     if(response.success) {
>     ...
>     }
>     </code>
>     </pre>
>     <br/>
>   - 결제 예약 <span id="naverpay-reserve-subscription"></span>
>     <pre>
>     <code>
>     const response = await Mipong.getNaverPay().reserveSubscription({
>        /*! 정기/반복결제 등록 번호 */
>        recurrentId: string;
>        /*! 총 결제 금액 */
>        totalPayAmount: number;
>        /*! 과제 대상 금액 */
>        taxScopeAmount: number;
>        /*! 면세 대상 금액 */
>        taxExScopeAmount: number;
>        /*! 상품명 */
>        productName: string;
>        /*! 가맹점 주문내역 확인 가능한 가맹점 결제번호 또는 주문번호 */
>        merchantPayId: string;
>        /*! 가맹점 주문내역 확인 가능한 가맹점 결제번호 또는 주문번호 */
>        merchantUserId: string;
>        /*! 이용완료일(yyyymmdd) */
>        useCfmYmdt?: string;
>      })
>     if(response.success) {
>     ...
>     }
>     </code>
>     </pre>
>     <br/>
>   - 결제 승인 <span id="naverpay-approve-subscription"></span>
>     <pre>
>       <code>
>     const response = await Mipong.getNaverPay().approveSubscription({
>     recurrentId: string;
>     paymentId: string;
>     })
>     if(response.success) {
>     ...
>     }
>     </code>
>     </pre>
>     <br/>
> - 공통
>   - 결제 취소 <span id="naverpay-cancel-payment"></span>
>     <pre>
>       <code>
>     const response = await Mipong.getNaverPay().cancelPayment({
>          /*! 네이버페이 결제번호 */
>          paymentId: string;
>          /*! 가맹점의 결제 번호 */
>          merchantPayKey?: string;
>          /*! 취소 요청 금액 */
>          cancelAmount: number;
>          /*! 취소 사유 */
>          cancelReason: string;
>          /*! 취소 요청자(1: 구매자, 2: 가맹점 관리자) 구분이 애매한 경우 가맹점 관리자로 입력합니다 */
>          cancelRequester: 1 | 2;
>          /*! 과세 대상 금액. 과세 대상 금액 + 면세 대상 금액 = 총 결제 금액 */
>          taxScopeAmount: number;
>          /*! 면세 대상 금액. 과세 대상 금액 + 면세 대상 금액 = 총 결제 금액 */
>          taxExScopeAmount: number;
>          /*! 가맹점의 남은 금액과 네이버페이의 남은 금액이 일치하는지 체크하는 기능을 수행할지 여부 */
>          /*! 1: 수행 0: 미수행 */
>          doCompareRest?: 0 | 1;
>          /*!
>          * 이번 취소가 수행되고 난 후에 남을 가맹점의 예상 금액
>          * 옵션 파라미터인 doCompareRest값이 1일 때에만 동작합니다
>          * Ex)
>          * 결제금액 1000원 중 200원을 취소하고 싶을 때 =>
>          * expectedRestAmount =800원, cancelAmount=200원으로 요청
>          **/
>          expectedRestAmount?: number;
>       },
>       type: "onetime" | "subscription"
>     )
>     if(response.success) {
>       ...
>     }
>       </code>
>     </pre>
>   - 결제내역조회 <span id="naverpay-get-payment"></span>
>     <pre>
>       <code>
>     const response = await Mipong.getNaverPay().getPayment({
>            /*! 조회하고자 하는 네이버페이 결제번호 */
>            /*! 결제번호를 입력값으로 선택하면 startTime, endTime, pageNumber, rowsPerPage  파라미터값은 무시됩니다 */
>            paymentId?: string;
>            /*! 검색 시작 일시(YYYYMMDDHH24MMSS) */
>            /*! 검색 기간(startTime과 endTime 사이의 시간)은 31일 이내여야 합니다 */
>            startTime?: string;
>            /*! 검색 종료 일시(YYYYMMDDHH24MMSS) */
>            /*! 검색 기간(startTime과 endTime 사이의 시간)은 31일 이내여야 합니다 */
>            endTime?: string;
>            /*! ALL:전체, APPROVAL:승인, CANCEL:취소 */
>            approvalType?: "ALL" | "APPROVAL" | "CANCEL";
>            /*! 조회하고자 하는 페이지번호 */
>            /*! 값이 없으면 1로 간주합니다 */
>            pageNumber?: number;
>            /*! 페이지 당 row 건수 */
>            /*! 1~100까지 지정 가능하며, 값이 없으면 20으로 간주합니다 */
>            rowsPerPage?: number;
>            /*! 1: 해당 그룹에 속한 모든 가맹점의 결제내역을 조회 할 수 있습니다 */
>            /*! 일반 개별 가맹점에서는 사용 할 수 없고, 그룹형 마스터 가맹점만 사용 가능한 옵션입니다 */
>            collectChainGroup?: number;
>        },
>        type: "onetime" | "subscription"
>     )
>     if(response.success) {
>       ...
>     }
>       </code>
>     </pre>

<br/>

---

<br/>

### 토스페이먼츠 <span id="toss-payments"></span>

https://docs.tosspayments.com/guides/card

> - 일반 결제
>   - [결제 승인](#tosspayments-approve-onetime)
> - 빌링(자동결제)
>   - [빌링키 발급하기](#tosspayments-register-subscription)
>   - [빌링키로 결제 요청하기](#tosspayments-approve-subscription)
> - 공통
>   - [주문 조회](#tosspayments-get-payment)
>   - [결제 취소](#tosspayments-cancel-payment)

<br/>

---

<br/>

### 코드 예시

> - 일반 결제
>   - 결제 승인 <span id="tosspayments-approve-onetime"></span>
>     <pre>
>       <code>
>     const response = await Mipong.getTossPayments().approveOnetime({
>           /*! 결제 승인을 위해 사용되는 키 값입니다. 이 키를 이용해 결제 승인 API를 요청할 수 있습니다. */
>            paymentKey: string;
>            /*! requestPayment(결제창 호출)를 호출할 때 파라미터로 넘겼던 orderId 가 돌아옵니다. */
>            orderId: string;
>            /*! 사용자가 실제로 결제한 금액입니다. */
>            amount: number;
>        },
>     )
>     if(response.success) {
>       ...
>     }
>       </code>
>     </pre>
> - 빌링(자동결제)
>   - 빌링키 발급하기 <span id="tosspayments-register-subscription"></span>
>     <pre>
>       <code>
>     const response = await Mipong.getTossPayments().registerSubscription({
>           authKey: string;
>           customerKey: string;
>        },
>     )
>     if(response.success) {
>       ...
>     }
>       </code>
>     </pre>
>   - 빌링키로 결제 요청하기 <span id="tosspayments-approve-subscription"></span>
>     <pre>
>       <code>
>     const response = await Mipong.getTossPayments().approveSubscription({
>            billingKey: string;
>            amount: number;
>            customerKey: string;
>            orderId: string;
>            customerEmail?: string;
>            customerName?: string;
>            orderName?: string;
>        },
>     )
>     if(response.success) {
>       ...
>     }
>       </code>
>     </pre>
> - 공통
>   - 주문 조회 <span id="tosspayments-get-payment"></span>
>     <pre>
>       <code>
>     const response = await Mipong.getTossPayments().getPayment({
>            paymentKey: string;
>        },
>     )
>     if(response.success) {
>       ...
>     }
>       </code>
>     </pre>
>   - 결제 취소 <span id="tosspayments-cancel-payment"></span>
>     <pre>
>       <code>
>     const response = await Mipong.getTossPayments().cancelPayment({
>            paymentKey: string;
>            cancelReason: string;
>            cancelAmount: number;
>            refundReceiveAccount?: TossPaymentsVBankCancelParam;
>            taxAmount?: number;
>            taxFreeAmount?: number;
>            refundableAmount?: number;
>      }, "onetime")
>     if(response.success) {
>       ...
>     }
>       </code>
>     </pre>

<br/>

---

<br/>

### 토스페이 <span id="tosspay"></span>

https://tossdev.github.io/api.html

> - 일반 결제
>   - [결제 생성](#tosspay-ready)
>   - [가맹점 결제 승인](#tosspay-approve-onetime)
> - 빌링(자동결제)
>   - [빌링키 발급하기](#tosspay-register-subscription)
>   - [빌링키로 결제 요청하기](#tosspay-approve-subscription)
> - 공통
>   - [결제 환불](#tosspay-cancel-payment)
>   - [결제 상태 확인](#tosspay-get-payment)

<br/>

---

<br/>

### 코드 예시

> - 일반 결제
>   - 결제 생성 <span id="tosspay-ready"></span>
>     <pre>
>       <code>
>     const response = await Mipong.getTossPay().ready({
>          /*! 고유 주문번호 */
>          orderNo: string;
>          /*! 결제 금액 (string 으로 보내면 안됨) */
>          amount: number;
>          /*! 
>            비과세 금액 
>            과세 품목인 경우, 0으로 보내야 함. 안보낼 경우 에러가 발생합니다.
>          */
>          amountTaxFree: number;
>          /*! 상품 정보 (UTF-8) */
>          productDesc: string;
>          /*! 결제 결과 callback 웹 URL (필수-자동승인설정 true의 경우) */
>          resultCallback?: string;
>          /*! 결제 완료 후 연결할 웹 URL (필수) */
>          retUrl: string;
>          /*! 결제 취소 시 연결할 웹 URL (필수) */
>          retCancelUrl: string;
>          /*! 결제 완료 후 연결할 가맹점 측 앱 스킴 값 */
>          retAppScheme?: string;
>          /*! 자동 승인 여부 설정 (true 를 설정한 경우, resultCallback 을 필수 값으로 체크합니다.) */
>          autoExecute?: boolean;
>          /*! callback 버전 (필수-자동승인설정 true의 경우) */
>          /*! V1: callback 리턴 값을 파라미터로 받음, V2: callback 리턴값을 JSON 으로 받음 */
>          /*! 이 값이 포함되지 않을 경우 기존의 V1 버전의 데이터가 전달됩니다. */
>          callbackVersion?: string;
>          /*! 결제 금액 중 과세금액 */
>          amountTaxable?: number;
>          /*! 결제 금액 중 부가세 */
>          /*! 값이 없으면 환불할 과세금액을 11로 나눈 후 소수점 첫째 자리에서 올림으로 계산합니다. */
>          amountVat?: number;
>          /*! 결제 금액 중 봉사료 */
>          amountServiceFee?: number;
>          /*! 결제 만료 기한 (기본값 10분, 최대 60분 설정 가능) */
>          /*! 형식 : 2020-03-03 12:30:20 */
>          expiredTime?: string;
>          /*! 현금영수증 발급 가능 여부 */
>          /*! 기본값이 true 이기 때문에 현금영수증 사용 시 별도로 선언하지 않아도 됨. */
>          cashReceipt?: boolean;
>          cashReceiptTradeOption?: /*! 문화비 */
>          | "CULTURE"
>            /*! 일반(default) */
>            | "GENERAL"
>            /*! 교통비 */
>            | "PUBLIC_TP";
>          /*! 결제수단 구분변 */
>          enablePayMethods?: string;
>          /*! 결제창에 특정 카드만 노출하고 싶은 경우 */
>          /*! ex) 삼성카드, 현대카드만 노출하고 싶은 경우 */
>          /*!     {"options": [{"cardCompanyCode":3},{"cardCompanyCode":5}]} */
>          cardOptions?: {
>            options: {
>              cardCompanyCode: number;
>            }[];
>          };
>          /*! 할부 제한 타입 */
>          /*! 신용카드 결제 시, 사용자의 할부 선택을 제한할 수 있음. */
>          installment?: "USE" | "NOT_USE";
>        },
>     )
>     if(response.success) {
>       ...
>     }
>       </code>
>     </pre>
>   - 가맹점 결제 승인 <span id="tosspay-approve-onetime"></span>
>     <pre>
>       <code>
>     const response = await Mipong.getTossPay().approveOnetime({
>          payToken: string;
>          orderNo: string;
>      })
>     if(response.success) {
>       ...
>     }
>       </code>
>     </pre>
> - 빌링(자동결제)
>   - 빌링키 발급하기 <span id="tosspay-register-subscription"></span>
>     <pre>
>       <code>
>     const response = await Mipong.getTossPay().registerSubscription({
>            /*! 가맹점 사용자 식별 값 */
>            /*!   가맹점에서 사용자를 식별할 수 있는 유니크한 키 */
>            /*! 가맹점에 저장된 회원 아이디를 활용할 수 있다. */
>            /*! 추후 결제 승인 정보와 매칭하기 위하여 필요하며 유니크한 값을 사용하길 권장한다. 주문번호의 >개념) */
>            /*! 최대 50자로 지정하며 숫자, 영문자도 가능하되 특수문자는 _-:.^@ 만 허용한다 */
>            userId: string;
>            /*! 표시 가능한 빌링키 식별 값 */
>            /*!   빌링키의 경우 기본적으로 하나의 가맹점 - 하나의 토스 유저 - 하나의 빌링키 만 >가능하지만, 가맹점에서 동 */
>            /*! 일한 사람 (하나의 토스유저)이 여러개의 빌링키를 활용 이 가능 해야 한다면, 이 파라미달하여 >여러개의 빌 */
>            /*! 링키를 생성 할 수 있다. */
>            /*! 해당 값은 토스 앱 내에 표시가 되는 값 이므로, 사용자가 알아볼 수 있는 값을 추천 한다. */
>            /*! 해당 값은 userId 와 함께 발급된 빌링키를 특정할 수 있는 값 이므로, 유니크한 값을 사용권장한다. */
>            /*! 최대 50자로 지정하며 숫자, 영문자도 가능하되 특수문자는 _-:.^@ 만 허용한다. */
>            displayId?: string;
>            /*! 자동결제 상품명 */
>            /*! 토스 결제창에 표기될 가맹점의 자동결제 상품명 */
>            productDesc: string;
>            /*! 가맹점 설정 콜백 URL */
>            /*!   사용자가 토스 앱을 통해 인증을 완료한 후 이 곳에 입력한 가맹점 서버로 결과 callba데이터를 전달한다. */
>            /*! callback 호출방식은 Server(토스) to Server(가맹점) 방식이다. */
>            /*! 80, 443 이외의 port가 포함되면 이용할 수 없으니 가맹점의 유의가 필요하다. */
>            /*! 토스 방화벽 정책은 https://tossdev.github.io/qna.html#faq-1 링크에서 확인할 . >*/
>            /*! 사용자의 '인증완료' 이외의 경우에도 토스에서 임의로 callback 을 전달할 수 있다. (6-링키 >처리결과 */
>            /*! callback 설명 참고) */
>            /*! 응답 데이터의 상세한 설명은 3. 빌링키 생성결과 callback 에서 정의한다 */
>            resultCallback: string;
>            /*! 인증완료 후 연결할 가맹점의 앱 스킴 */
>            /*!   토스 자동결제는 기본적으로 App 방식을 지원하지만 최근 PC 결제방식도 도입됐다. (진입점이 Web)' 이라면 */
>            /*! 앱스킴을 포함하지 않아도 된다.) */
>            /*! 토스 앱을 띄워 사용자 인증을 완료한 후 redirect 될 가맹점 앱 스킴 값을 선언해야 한다.킴 >선언 형식은 아래 */
>            /*! 와 같다. */
>            /*! 앱 스킴 예시 : testshop://  */
>            retAppScheme?: string;
>            /*! 인증성공 후 연결할 가맹점 성공 페이지 */
>            /*!   retAppScheme 선언되지 않으면 returnSuccessUrl, returnFailureUrl 는 체크한다. */
>            /*! 불필요하다면 두 값에 동일한 URL 을 설정해도 무방하다. */
>            /*! 사용자 인증이 완료되면 URL 로 이동시키면서 빌링키 상태(status), 사용자 식별 값(userId)링키 */
>            /*! (billingKey), 실패 에러코드(errorCode) 를 query string 파라미터로 함께 보낸다. */
>            returnSuccessUrl?: string;
>            /*! 인증실패 시 연결할 가맹점 실패 페이지 */
>            /*!   retAppScheme 선언되지 않으면 returnSuccessUrl, returnFailureUrl 는 체크한다. */
>            /*! 불필요하다면 두 값에 동일한 URL 을 설정해도 무방하다. */
>            /*! 사용자 인증이 완료되면 URL 로 이동시키면서 빌링키 상태(status), 사용자 식별 값(userId)링키 */
>            /*! (billingKey), 실패 에러코드(errorCode) 를 query string 파라미터로 함께 보낸다. */
>            returnFailureUrl?: string;
>        },
>     )
>     if(response.success) {
>       ...
>     }
>       </code>
>     </pre>
>   - 빌링키로 결제 요청하기 <span id="tosspay-approve-subscription"></span>
>     <pre>
>       <code>
>     const response = await Mipong.getTossPay().approveSubscription({
>                        /*! 승인할 사용자의 빌링키 */
>                          billingKey: string;
>                          /*!   가맹점의 상품 주문번호 */
>                          /*! 최대 50자로 지정하며 숫자, 영문자도 가능하되 특수문자는 _-:.^@ 만 허용한다. >*/
>                          /*! 가맹점의 주문번호는 매회 유니크한 값으로 생성하길 권장한다. (테스트와 라이브 >환경에서 중복되지 않아야 된다) */
>                          orderNo: string;
>                          /*! 결제할 상품 설명 */
>                          productDesc: string;
>                          /*!   총 결제 요청 금액 */
>                          /*! 토스에서 금액과 관련된 모든 필드는 Number 형태로 선언한다. 선언된 금액으로 >현금영수증을 발급한다. */
>                          /*! 필수 체크는 총금액(amount) 과 비과세 금액(amountTaxFree) 만 체크한다. >판매 상품이 과세 */
>                          /*! 상품이라면 amount 와 amountTaxFree 만 포함하면 되고, 이후 계산은 토스 >서버에서 자동으로 계산된다. */
>                          amount: number;
>                          /*!   판매하는 상품이 과세 품목이라면 해당 값을 0으로 선언한다. 그 외의 과세 >계산은 토스 서버에서 자동처리 한다. */
>                         /*! 토스에서 금액과 관련된 모든 필드는 Number 형태로 선언한다. 필수 체크는 >총금액과 비과세 금액만 체크한다. */
>                          amountTaxFree: number;
>                          amountTaxable?: number;
>                          amountVat?: number;
>                          amountServiceFee?: number;
>                          /*!   사용자가 선택한 카드 할부개월 (5만원 미만은 기본 일시불 결제) */
>                          /*! 0(일시불) ~ 12개월 까지 숫자형태로 선언한다. */
>                          spreadOut?: string;
>                          /*!   토스머니와 같이 현금성 결제는 현금영수증 발행 대상이다. */
>                          /*! 토스 현금영수증 자동발행 기능을 사용한다면 매회 결제 시 true 값을, 미 >사용하는 경우(가맹점 자체 발행) false 로 선언하면 된다. */
>                          cashReceipt: boolean;
>                          /*! 빌링키 결제가 실패할 경우, 해당 값이 true 일시 사용자에게 결제 실패 알람을 >발송 한다.  (기본은default) */
>                          /*!   같은 빌링키로 다회 요청을 하더라도, 결제 실패 알람은 1시간 최대 1회 발송 >가능 하다. */
>                          sendFailPush?: boolean;
>     })
>     if(response.success) {
>       ...
>     }
>       </code>
>     </pre>
> - 공통
>   - 결제 환불 <span id="tosspay-cancel-payment"></span>
>     <pre>
>       <code>
>     const response = await Mipong.getTossPay().cancelPayment({
>          /*! 토스 결제 토큰 */
>          payToken: string;
>          /*! 환불 번호 */
>          refundNo?: string;
>          /*! 환불 사유 */
>          reason?: string;
>          /*! 환불할 금액 */
>          amount?: number;
>          /*! 환불할 금액 중 비과세금액 */
>          amountTaxFree?: number;
>          /*! 환불할 금액 중 과세금액 */
>          amountTaxable?: number;
>          /*! 환불할 금액 중 부가세 */
>          amountVat?: number;
>          /*! 환불할 금액 중 봉사료 */
>          amountServiceFee?: number;
>      })
>     if(response.success) {
>       ...
>     }
>       </code>
>     </pre>
>   - 결제 상태 확인 <span id="tosspay-get-payment"></span>
>     <pre>
>     <code>
>     const response = await Mipong.getTossPay().getPayment({
>     /_! 토스 결제 토큰 _/
>     payToken: string;
>     })
>     if(response.success) {
>     ...
>     }
>     </code>
>     </pre>
>     <br/>

---

<br/>

### 나이스페이먼츠 <span id="nicepay"></span>

(현재 카드빌링 기능만 구현)

https://developers.nicepay.co.kr

> - 카드빌링(자동결제)
>   - [빌링키 발급하기](#nicepay-register-subscription)
>   - [빌링키로 결제 요청하기](#nicepay-approve-subscription)
> - 공통
>   - [결제 환불](#nicepay-cancel-payment)

<br/>

---

<br/>

### 코드 예시

> - 카드빌링(자동결제)
>   - 빌링키 발급하기 <span id="nicepay-register-subscription"></span>
>     <pre>
>       <code>
>     const response = await Mipong.getNicePay().registerSubscription({
>          BuyerName: string;
>          BuyerEmail: string;
>          BuyerTel: string;
>          CharSet?: string;
>          CardNo: string;
>          ExpYear: string;
>          ExpMonth: string;
>          IDNo: string;
>          CardPw: string;
>          MID?: string;
>          EdiDate?: string;
>          Moid?: string;
>          EncData?: string;
>          SignData?: string;
>          /*! 응답전문 유형 (default(미설정): JSON / KV(설정): Key=Value형식 응답) */
>          EdiType?: string;
>        })
>     if(response.success) {
>       ...
>     }
>       </code>
>     </pre>
>   - 빌링키로 결제 요청하기 <span id="nicepay-approve-subscription"></span>
>     <pre>
>       <code>
>     const response = await Mipong.getNicePay().approveSubscription({
>        /*! 빌링키 */
>        BID: string;
>        /*! 상점 ID */
>        MID?: string;
>        TID?: string;
>        EdiDate?: string;
>        /*! 상점에서 부여한 주문번호 OrderCID */
>        Moid: string;
>        Amt: string;
>        /*! 상품명 "|"(파이프라인) 특수기호는 당사 응답전문의 구분값으로 사용을 금지하며 이외 특수기호 사용 시 >영업담당자 협의 필요 */
>        GoodsName: string;
>        /*! 위변조 검증 Data, Hex(SHA256(MID + EdiDate + Moid + Amt + BID + 상점키)) */
>        SignData?: string;
>        /*! 가맹점 분담 무이자 사용 여부 (0: 사용안함_이자 / 1: 사용_무이자) */
>        CardInterest: string;
>        /*! 할부개월 (00: 일시불 /02:2개월 /03:3개월 ...) */
>        CardQuota: string;
>        /*! 카드사 포인트 사용 여부 (0(default): 미사용 / 1: 사용) */
>        CardPoint?: string;
>        BuyerName: string;
>        BuyerEmail: string;
>        /*! 구매자 전화번호, ‘-‘ 없이 숫자만 입력 */
>        BuyerTel: string;
>        /*! 별도공급가액설정시사용 */
>        SupplyAmt?: string;
>        /*! 별도부가세설정시사용 */
>        GoodsVat?: string;
>        /*! 별도봉사료설정시사용 */
>        ServiceAmt?: string;
>        /*! 별도면세금액설정시사용 */
>        TaxFreeAmt?: string;
>        /*! 응답파라미터 인코딩 방식 (utf-8 / euc-kr(default)) */
>        CharSet?: string;
>        /*! 응답전문 유형 (default(미설정): JSON / KV(설정): Key=Value형식 응답) */
>        EdiType?: string;
>        /*! 상점 정보 전달용 여분필드 (Nicepay 가공없음) */
>        MallReserved?: string;
>        },
>     )
>     if(response.success) {
>       ...
>     }
>       </code>
>     </pre>
> - 공통
>   - [결제 환불] <span id="nicepay-cancel-payment"></span>
>     <pre>
>       <code>
>     const response = await Mipong.getNicePay().cancelPayment({
>        /*! 거래 ID */
>        TID: string;
>        /*! 상점 ID */
>        MID?: string;
>        /*! 주문번호 (부분 취소 시 중복취소 방지를 위해 설정) */
>        Moid: string;
>        CancelAmt: string;
>        /*! 취소사유 (euc-kr) */
>        CancelMsg: string;
>        /*! 0:전체 취소, 1:부분 취소 */
>        PartialCancelCode: string;
>        /*! 요청 시간 (YYYYMMDDHHMMSS) */
>        EdiDate?: string;
>        /*! hex(sha256(MID + CancelAmt + EdiDate + MerchantKey)) */
>        SignData?: string;
>        SupplyAmt?: string;
>        GoodsVat?: string;
>        ServiceAmt?: string;
>        TaxFreeAmt?: string;
>        /*! 인증 응답 인코딩 (euc-kr / utf-8) */
>        CharSet?: string;
>        /*! 장바구니 결제 유형 (장바구니 결제:1/ 그 외:0) */
>        CartType: string;
>        /*! 응답전문 유형 (JSON / KV) *KV:Key=value */
>        EdiType?: string;
>        MallReserved?: string;
>     }, "onetime" | "subscription")
>     if(response.success) {
>       ...
>     }
>       </code>
>     </pre>
