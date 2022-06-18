export enum TossPayAPI {
  ApproveOnetime,
  Ready,
  CancelPayment,
  GetPayment,
  RegisterSubscription,
  ApproveSubscription,
  CheckSubscription,
  InactivateSubscription,
}

export type TossPayBillingKeyStatus = "REMOVE" | "ACTIVE";
export type TossPayPaymentStatus =
  /*! 결제 대기 중 */
  | "PAY_STANDBY"
  /*! 구매자 인증 완료 */
  | "PAY_APPROVED"
  /*! 결제 취소 */
  | "PAY_CANCEL"
  /*! 결제 진행 중 */
  | "PAY_PROGRESS"
  /*! 결제 완료 */
  | "PAY_COMPLETE"
  /*! 환불 진행 중 */
  | "REFUND_PROGRESS"
  /*! 환불 성공 */
  | "REFUND_SUCCESS"
  /*! 정산 완료 */
  | "SETTLEMENT_COMPLETE"
  /*! 환불 정산 완료 */
  | "SETTLEMENT_REFUND_COMPLETE";
export type TossPayResponse = TossPaySuccessResponse | TossPayFailResponse;
export type TossPayPayMethod = "TOSS_MONEY" | "CARD";
export interface TossPaySuccessResponse {
  code: 0;
}
export interface TossPayFailResponse {
  result: number;
  msg: string;
  code: -1;
  errorCode: string;
  status: number;
}
export interface TossPayReadyParam {
  /*! 고유 주문번호 */
  orderNo: string;
  /*! 결제 금액 (string 으로 보내면 안됨) */
  amount: number;
  /*! 
    비과세 금액 
    과세 품목인 경우, 0으로 보내야 함. 안보낼 경우 에러가 발생합니다.
  */
  amountTaxFree: number;
  /*! 상품 정보 (UTF-8) */
  productDesc: string;
  /*! 결제 결과 callback 웹 URL (필수-자동승인설정 true의 경우) */
  resultCallback?: string;
  /*! 결제 완료 후 연결할 웹 URL (필수) */
  retUrl: string;
  /*! 결제 취소 시 연결할 웹 URL (필수) */
  retCancelUrl: string;
  /*! 결제 완료 후 연결할 가맹점 측 앱 스킴 값 */
  retAppScheme?: string;
  /*! 자동 승인 여부 설정 (true 를 설정한 경우, resultCallback 을 필수 값으로 체크합니다.) */
  autoExecute?: boolean;
  /*! callback 버전 (필수-자동승인설정 true의 경우) */
  /*! V1: callback 리턴 값을 파라미터로 받음, V2: callback 리턴값을 JSON 으로 받음 */
  /*! 이 값이 포함되지 않을 경우 기존의 V1 버전의 데이터가 전달됩니다. */
  callbackVersion?: string;
  /*! 결제 금액 중 과세금액 */
  amountTaxable?: number;
  /*! 결제 금액 중 부가세 */
  /*! 값이 없으면 환불할 과세금액을 11로 나눈 후 소수점 첫째 자리에서 올림으로 계산합니다. */
  amountVat?: number;
  /*! 결제 금액 중 봉사료 */
  amountServiceFee?: number;
  /*! 결제 만료 기한 (기본값 10분, 최대 60분 설정 가능) */
  /*! 형식 : 2020-03-03 12:30:20 */
  expiredTime?: string;
  /*! 현금영수증 발급 가능 여부 */
  /*! 기본값이 true 이기 때문에 현금영수증 사용 시 별도로 선언하지 않아도 됨. */
  cashReceipt?: boolean;
  cashReceiptTradeOption?: /*! 문화비 */
  | "CULTURE"
    /*! 일반(default) */
    | "GENERAL"
    /*! 교통비 */
    | "PUBLIC_TP";
  /*! 결제수단 구분변 */
  enablePayMethods?: string;
  /*! 결제창에 특정 카드만 노출하고 싶은 경우 */
  /*! ex) 삼성카드, 현대카드만 노출하고 싶은 경우 */
  /*!     {"options": [{"cardCompanyCode":3},{"cardCompanyCode":5}]} */
  cardOptions?: {
    options: {
      cardCompanyCode: number;
    }[];
  };
  /*! 할부 제한 타입 */
  /*! 신용카드 결제 시, 사용자의 할부 선택을 제한할 수 있음. */
  installment?: "USE" | "NOT_USE";
}
export interface TossPayReadyResponse extends TossPaySuccessResponse {
  status: number;
  /*! 결제를 진행할 수 있는 토스 결제 웹페이지 URL입니다. 상점에서는 이 URL을 사용자에게 띄워주세요. */
  checkoutPage: string;
  /*! 거래를 구분할 수 있는 토스 고유 값 */
  payToken: string;
}
export interface TossPayApproveOnetimeParam {
  payToken: string;
  orderNo: string;
}
export interface TossPayApproveOnetimeResponse extends TossPaySuccessResponse {
  mode: string;
  orderNo: string;
  amount: number;
  approvalTime: string;
  discountedAmount?: number;
  paidPoint: number;
  paidAmount: number;
  payMethod: TossPayPayMethod;
  payToken: string;
  transactionId: string;
  cardCompanyCode?: number;
  cardCompanyName?: string;
  cardAuthorizationNo?: string;
  spreadOut?: number;
  noInterest?: boolean;
  salesCheckLinkUrl: string;
  cardMethodType?: "CREDIT" | "CHECK";
  cardNumber: string;
}

export interface TossPayGetPaymentParam {
  payToken: string;
}
export interface TossPayGetPaymentResponse extends TossPaySuccessResponse {
  /*! 결제 고유 토큰 */
  payToken: string;
  /*! 상점의 주문번호 */
  orderNo: string;
  /*! 결제 상태 */
  payStatus: TossPayPaymentStatus;
  /*! 결제 수단 */
  payMethod: TossPayPayMethod;
  /*! 결제 요청금액 */
  amount: number;
  /*! 거래 트랜잭션 목록 */
  transactions: {
    stepType: string;
    transactionId: string;
    transactionAmount: number;
    discountAmount: number;
    pointAmount: number;
    paidAmount: number;
    regTs: string;
  }[];
  /*! 최초 결제요청 시간 */
  createdTs: string;
  /*! 결제 완료 처리 시간 */
  paidTs: string;
}
export interface TossPayCancelParam {
  /*! 토스 결제 토큰 */
  payToken: string;
  /*! 환불 번호 */
  refundNo?: string;
  /*! 환불 사유 */
  reason?: string;
  /*! 환불할 금액 */
  amount?: number;
  /*! 환불할 금액 중 비과세금액 */
  amountTaxFree?: number;
  /*! 환불할 금액 중 과세금액 */
  amountTaxable?: number;
  /*! 환불할 금액 중 부가세 */
  amountVat?: number;
  /*! 환불할 금액 중 봉사료 */
  amountServiceFee?: number;
}
export interface TossPayCancelResponse extends TossPaySuccessResponse {
  /*! 환불 번호 */
  refundNo: string;
  /*! 환불 가능 금액 */
  refundableAmount: number;
  /*! 할인된 금액 */
  discountedAmount: number;
  /*! 지불수단 승인금액 */

  /*! 환불요청 금액 */
  refundedAmount: number;
  /*! paidPoint: number; */
  /*! 환불요청 금액 중 실 차감된 즉시할인 금액 */
  /*! 환불요청 시 전달한 amount 금액 중 토스 서버에서 자동 차감된 즉시할인 금액으로 차감액이 없으면 0으로 리턴됩니다. */
  refundedDiscountAmount: number;
  /*! 환불요청 금액 중 실 차감된 지불수단 금액 */
  /*! 환불요청 시 전달한 amount 금액 중 토스 서버에서 자동 차감된 지불수단 금액으로 차감액이 없으면 0으로 리턴됩니다. */
  refundedPaidAmount: number;
  /*! 결제건의 환불 처리 시간 (yyyy-MM-dd HH:mm:ss) */
  approvalTime: string;
  /*! 환불된 결제토큰 */
  payToken: string;
  /*! 거래 트랜잭션 아이디 */
  /*! 환불된 거래건의 매출전표 확인을 위하여 필요한 옵션 값이므로 가맹점의 관리가 필요합니다. */
  transactionId: string;
}
export interface TossPayRegisterSubscriptionParam {
  /*! 가맹점 사용자 식별 값 */
  /*!   가맹점에서 사용자를 식별할 수 있는 유니크한 키 */
  /*! 가맹점에 저장된 회원 아이디를 활용할 수 있다. */
  /*! 추후 결제 승인 정보와 매칭하기 위하여 필요하며 유니크한 값을 사용하길 권장한다. (결제 주문번호의 개념) */
  /*! 최대 50자로 지정하며 숫자, 영문자도 가능하되 특수문자는 _-:.^@ 만 허용한다 */
  userId: string;
  /*! 표시 가능한 빌링키 식별 값 */
  /*!   빌링키의 경우 기본적으로 하나의 가맹점 - 하나의 토스 유저 - 하나의 빌링키 만 사용이 가능하지만, 가맹점에서 동 */
  /*! 일한 사람 (하나의 토스유저)이 여러개의 빌링키를 활용 이 가능 해야 한다면, 이 파라미터를 전달하여 여러개의 빌 */
  /*! 링키를 생성 할 수 있다. */
  /*! 해당 값은 토스 앱 내에 표시가 되는 값 이므로, 사용자가 알아볼 수 있는 값을 추천 한다. */
  /*! 해당 값은 userId 와 함께 발급된 빌링키를 특정할 수 있는 값 이므로, 유니크한 값을 사용하길 권장한다. */
  /*! 최대 50자로 지정하며 숫자, 영문자도 가능하되 특수문자는 _-:.^@ 만 허용한다. */
  displayId?: string;
  /*! 자동결제 상품명 */
  /*! 토스 결제창에 표기될 가맹점의 자동결제 상품명 */
  productDesc: string;
  /*! 가맹점 설정 콜백 URL */
  /*!   사용자가 토스 앱을 통해 인증을 완료한 후 이 곳에 입력한 가맹점 서버로 결과 callback 데이터를 전달한다. */
  /*! callback 호출방식은 Server(토스) to Server(가맹점) 방식이다. */
  /*! 80, 443 이외의 port가 포함되면 이용할 수 없으니 가맹점의 유의가 필요하다. */
  /*! 토스 방화벽 정책은 https://tossdev.github.io/qna.html#faq-1 링크에서 확인할 수 있다. */
  /*! 사용자의 '인증완료' 이외의 경우에도 토스에서 임의로 callback 을 전달할 수 있다. (6-B. 빌링키 처리결과 */
  /*! callback 설명 참고) */
  /*! 응답 데이터의 상세한 설명은 3. 빌링키 생성결과 callback 에서 정의한다 */
  resultCallback: string;
  /*! 인증완료 후 연결할 가맹점의 앱 스킴 */
  /*!   토스 자동결제는 기본적으로 App 방식을 지원하지만 최근 PC 결제방식도 도입됐다. (진입점이 '웹(Web)' 이라면 */
  /*! 앱스킴을 포함하지 않아도 된다.) */
  /*! 토스 앱을 띄워 사용자 인증을 완료한 후 redirect 될 가맹점 앱 스킴 값을 선언해야 한다. 앱 스킴 선언 형식은 아래 */
  /*! 와 같다. */
  /*! 앱 스킴 예시 : testshop://  */
  retAppScheme?: string;
  /*! 인증성공 후 연결할 가맹점 성공 페이지 */
  /*!   retAppScheme 선언되지 않으면 returnSuccessUrl, returnFailureUrl 는 필수 체크한다. */
  /*! 불필요하다면 두 값에 동일한 URL 을 설정해도 무방하다. */
  /*! 사용자 인증이 완료되면 URL 로 이동시키면서 빌링키 상태(status), 사용자 식별 값(userId), 빌링키 */
  /*! (billingKey), 실패 에러코드(errorCode) 를 query string 파라미터로 함께 보낸다. */
  returnSuccessUrl?: string;
  /*! 인증실패 시 연결할 가맹점 실패 페이지 */
  /*!   retAppScheme 선언되지 않으면 returnSuccessUrl, returnFailureUrl 는 필수 체크한다. */
  /*! 불필요하다면 두 값에 동일한 URL 을 설정해도 무방하다. */
  /*! 사용자 인증이 완료되면 URL 로 이동시키면서 빌링키 상태(status), 사용자 식별 값(userId), 빌링키 */
  /*! (billingKey), 실패 에러코드(errorCode) 를 query string 파라미터로 함께 보낸다. */
  returnFailureUrl?: string;
}
export interface TossPayRegisterSubscriptionResponse
  extends TossPaySuccessResponse {
  /*! 빌링키는 토스 사용자의 고유한 값이므로 한 상점에서 한 개의 빌링키만 허용한다. */
  /*! 사용자가 한 상점에서 2개 이상의 상점 계정을 사용하는 경우 혹은 그 외의 경우는 userId 로 식별해야한다 */
  billingKey: string;
  /*! 생성된 자동결제를 인증할 앱 URL 이다. */
  /*! 가맹점은 구매자의 디바이스 OS를 구분해서 해당 URL로 보내주면 된다. */
  /*! 앱 링크로 전달하는 이유는 토스앱이 미설치된 사용자에게는 설치를 위해 앱 스토어로 이동시키기 위함이며, */
  /*! 생성요청 시점부터 유효시간은 기본이 15분이며 변경이 불가하다. (유효시간 만료 후 재사용 불가함) */
  /*! URI 형식은 추후 변경될 수 있으니 변경 되더라도 오류가 발생하지 않도록 연동이 필요하다. */
  checkoutAndroidUri: string;
  checkoutIosUri: string;
  /*! 요청에서 retAppScheme 포함여부에 따라 기능이 다른 링크를 생성한다. */
  /*! retAppScheme 가 포함된 경우 : 가맹점에서 사용자 OS 구분이 어렵다면 혼용 가능한 onelink 를 제공 */
  /*! 한다. 가맹점 앱에서 토스 앱을 호출하는 기능이다. */
  /*! retAppScheme 가 포함되지 않은 경우 : pay Server 에서는 Web 결제로 인식한다. 따라서, PC에서 호 */
  /*! 출 가능한 payfront 링크를 제공한다. 토스 일반결제의 checkoutPage 의 기능과 같다. */
  checkoutUri: string;
}
export interface TossPayApproveSubscriptionParam {
  /*! 승인할 사용자의 빌링키 */
  billingKey: string;
  /*!   가맹점의 상품 주문번호 */
  /*! 최대 50자로 지정하며 숫자, 영문자도 가능하되 특수문자는 _-:.^@ 만 허용한다. */
  /*! 가맹점의 주문번호는 매회 유니크한 값으로 생성하길 권장한다. (테스트와 라이브 환경에서 중복되지 않아야 된다) */
  orderNo: string;
  /*! 결제할 상품 설명 */
  productDesc: string;
  /*!   총 결제 요청 금액 */
  /*! 토스에서 금액과 관련된 모든 필드는 Number 형태로 선언한다. 선언된 금액으로 현금영수증을 발급한다. */
  /*! 필수 체크는 총금액(amount) 과 비과세 금액(amountTaxFree) 만 체크한다. 판매 상품이 과세 */
  /*! 상품이라면 amount 와 amountTaxFree 만 포함하면 되고, 이후 계산은 토스 서버에서 자동으로 계산된다. */
  amount: number;
  /*!   판매하는 상품이 과세 품목이라면 해당 값을 0으로 선언한다. 그 외의 과세 계산은 토스 서버에서 자동처리 한다. */
  /*! 토스에서 금액과 관련된 모든 필드는 Number 형태로 선언한다. 필수 체크는 총금액과 비과세 금액만 체크한다. */
  amountTaxFree: number;
  amountTaxable?: number;
  amountVat?: number;
  amountServiceFee?: number;
  /*!   사용자가 선택한 카드 할부개월 (5만원 미만은 기본 일시불 결제) */
  /*! 0(일시불) ~ 12개월 까지 숫자형태로 선언한다. */
  spreadOut?: string;
  /*!   토스머니와 같이 현금성 결제는 현금영수증 발행 대상이다. */
  /*! 토스 현금영수증 자동발행 기능을 사용한다면 매회 결제 시 true 값을, 미 사용하는 경우(가맹점 자체 발행) false 로 선언하면 된다. */
  cashReceipt: boolean;
  /*! 빌링키 결제가 실패할 경우, 해당 값이 true 일시 사용자에게 결제 실패 알람을 발송 한다.  (기본은default) */
  /*!   같은 빌링키로 다회 요청을 하더라도, 결제 실패 알람은 1시간 최대 1회 발송 가능 하다. */
  sendFailPush?: boolean;
}
export interface TossPayApproveSubscriptionResponse
  extends TossPaySuccessResponse {
  /*! 결제건이 실제 승인된 시간을 리턴한다. (yyyy-MM-dd HH:mm:ss 형식) */
  approvalTime: string;
  amount: number;
  /*! TOSS_MONEY (토스머니 결제), CARD (카드 결제) */
  payMethod: TossPayPayMethod;
  /*!   정상 승인처리 되었을 때, 토스 서버에서 매회 유니크한 결제 토큰 값을 전달한다. */
  /*! 가맹점에서는 이 값을 반드시 저장해야 하며, 거래 환불요청 시 중요한 키 값이 될 수 있으니 관리가 필요하다 */
  payToken: string;
  /*!   결제의 거래구분을 위하여 토스 서버에서는 매회 유니크한 값을 생성해서 리턴한다. */
  /*! 가맹점에서는 매출전표를 호출하거나 환불 진행 시 구분 값으로 활용할 수 있다. */
  transactionId: string;
  /*! 승인에서 할인이 적용된 금액을 전달하며 할인적용이 없을 경우 0으로 전달한다. */
  discountedAmount?: number;
  /*!   총 금액에서 할인금액 등을 제외한 순수한 지불수단 승인금액을 의미한다. */
  /*! 현금영수증 발행 또는 별도로 활용하는 경우 이 값을 참조할 수 있다. */
  paidAmount: number;
  /*!   카드 결제의 경우만 전달되며, 승인된 카드사 명과 카드코드를 확인할 수 있다. */
  /*! (https://tossdev.github.io/api.html#execute 링크 참고) */
  cardCompanyName?: string;
  cardCompanyCode?: string;
  /*!   구매자가 확인할 수 있는 카드사 승인번호 8자리 */
  /*! 테스트 거래의 경우 00000000 으로 전달된다. */
  cardAuthorizationNo?: string;
  /*! 승인요청에서 구매자가 선택한 할부개월이 리턴된다. (일시불 결제는 0으로 전달) */
  spreadOut?: number;
  /*!   카드 무이자 적용여부 */
  /*! true : 무이자 */
  /*! false : 일반 */
  noInterest?: boolean;
  /*!   승인된 카드의 타입을 구분 */
  /*! CREDIT : 신용카드 */
  /*! CHECK : 체크카드 */
  cardMethodType?: string;
  /*!   사용자가 선택할 결제수단(payMethod) 이 '토스머니' 인 경우 토스가 정의한 은행코드를 전달한다. */
  /*! 은행코드 리스트는 가이드 하단에서 확인가능 */
  accountBankCode?: string;
  accountBankName?: string;
}
export interface TossPayCheckSubscriptionParam {
  /*!   가맹점이 생성한 사용자 식별 값 */
  /*! 2. 빌링키 생성 요청 에서 가맹점이 토스로 전달한 값 */
  userId: string;
  /*!   가맹점이 생성한 표시 가능한 빌링키 식별 값, 존재 한다면 필수 */
  /*! 2. 빌링키 생성 요청 에서 가맹점이 토스로 전달한 값 */
  displayId?: string;
}
export interface TossPayCheckSubscriptionResponse
  extends TossPaySuccessResponse {
  /*! ACTIVE : 빌링키 활성화 (사용자의 인증이 완료되어 사용할 수 있는 상태) */
  status: TossPayBillingKeyStatus;
  userId: string;
  displayId: string;
  billingKey: string;
  /*! 토스 앱에서 선택한 결제수단에 따라 토스머니(TOSS_MONEY) 또는 카드(CARD) 를 전달한다. */
  payMethod: TossPayPayMethod;
  /*! 결제수단이 카드인 경우에만 포함 */
  cardCompanyNo?: string;
  /*! 결제수단이 카드인 경우에만 포함 */
  cardCompanyName?: string;
  /*! 결제수단이 토스머니인 경우에만 포함 */
  accountBankCode?: string;
  /*! 결제수단이 토스머니인 경우에만 포함 */
  accountBankName?: string;
}
export interface TossPayInactivateSubscriptionParam {
  billingKey: string;
}
export type TossPayInactivateSubscriptionResponse = TossPaySuccessResponse;
