## @mipong/payments

Typescript 를 위한 결제 라이브러리.

많은 기업들에서 결제 기능을 Javascript 기반으로 개발하는 것을 기피합니다. Javascript 의 Type 불안정성이 가장 큰 이유입니다. 런타임에서 가지는 불안정성도 존재하지만, Javascript 의 Type 불안정성으로 인해 개발자가 내는 에러도 상당히 많습니다. @mipong 은 이러한 문제점을 최대한 해결하고자 만들어진, Typescript 기반으로 strict 하게 쓰여진 결제 라이브러리입니다.

<br/>

### 기본 사용법

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

### 환경 변수 주입 (가맹점 키, 시크릿 키)

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

### 카카오페이

https://developers.kakao.com/docs/latest/ko/kakaopay/common

> - 단건 결제
>   - 결제 요청 [v]
>   <pre>
>     <code>
>       Mipong.getKakaoPay().approveOnetime({
>         tid,
>         partner_order_id: "...",
>         partner_user_id: "...",
>         pg_token,
>       })
>       .then((response) => {
>         if(response.success) {
>           return ...
>         }
>         if(!response.success) {
>           return ...
>         }
>       });
>     </code>
>   </pre>
>   - 결제 승인 [v]
> - 정기 결제
>   - 정기 결제 고유번호 발급 [v]
>   - 정기 결제 시작 [v]
>   - 정기 결제 요청 [v]
>   - 정기 결제 비활성화 [v]
>   - 정기 결제 상태 조회 [v]
>   - 결제 수단 변경 [x]
> - 주문 조회 [v]
> - 결제 취소 [v]

<br/>
### 네이버페이

https://developer.pay.naver.com/docs/v2/api#common-common_certi

> - 간편결제 플랫폼
>   - 결제 승인 [v]
>   - 결제 취소 [v]
>   - 결제내역조회 [v]
>   - 거래완료 [x]
>   - 포인트 적립 요청 [x]
>   - 현금영수증 발행대상 금액조회 [x]
> - 정기/반복결제 플랫폼
>   - 등록 완료 [v]
>   - 등록 해지 [v]
>   - 등록 내역 조회 [v]
>   - 결제 예약 [v]
>   - 결제 승인 [v]
>   - 결제 취소 [x]
>   - 결제내역조회 [v]
>   - 거래완료 [x]
>   - 포인트 적립 요청 [x]
>   - 현금영수증 발행대상 금액조회 [x]

### 토스페이먼츠 (PG)

https://docs.tosspayments.com/guides/card

> - 일반 결제
>   - 결제 승인 [v]
> - 빌링(자동결제)
>   - 빌링키 발급하기 [v]
>   - 빌링키로 결제 요청하기 [v]
> - 주문 조회 [v]
> - 결제 취소 [v]

### 토스페이

https://tossdev.github.io/api.html

> - 일반 결제
>   - 결제 생성 [v]
>   - 가맹점 결제 승인 [v]
> - 빌링(자동결제)
>   - 빌링키 발급하기 [v]
>   - 빌링키로 결제 요청하기 [v]
> - 결제 환불 [v]
> - 결제 상태 확인 [v]
