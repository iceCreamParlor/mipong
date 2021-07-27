export enum TossPayAPI {
  ApproveOnetime,
  Ready,
  CancelPayment,
  GetPayment,
}

export type TossPayBillingKeyStatus = "REMOVE" | "ACTIVE";
export type TossPayPaymentStatus =
  // 결제 대기 중
  | "PAY_STANDBY"
  // 구매자 인증 완료
  | "PAY_APPROVED"
  // 결제 취소
  | "PAY_CANCEL"
  // 결제 진행 중
  | "PAY_PROGRESS"
  // 결제 완료
  | "PAY_COMPLETE"
  // 환불 진행 중
  | "REFUND_PROGRESS"
  // 환불 성공
  | "REFUND_SUCCESS"
  // 정산 완료
  | "SETTLEMENT_COMPLETE"
  // 환불 정산 완료
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
  // 고유 주문번호
  orderNo: string;
  // 결제 금액 (string 으로 보내면 안됨)
  amount: number;
  // 비과세 금액
  // 과세 품목인 경우, 0으로 보내야 함. 안보낼 경우 에러가 발생합니다.
  amountTaxFree: number;
  // 상품 정보 (UTF-8)
  productDesc: string;
  // 결제 결과 callback 웹 URL (필수-자동승인설정 true의 경우)
  resultCallback?: string;
  // 결제 완료 후 연결할 웹 URL (필수)
  retUrl: string;
  // 결제 취소 시 연결할 웹 URL (필수)
  retCancelUrl: string;
  // 결제 완료 후 연결할 가맹점 측 앱 스킴 값
  retAppScheme?: string;
  // 자동 승인 여부 설정 (true 를 설정한 경우, resultCallback 을 필수 값으로 체크합니다.)
  autoExecute?: boolean;
  // callback 버전 (필수-자동승인설정 true의 경우)
  // V1: callback 리턴 값을 파라미터로 받음, V2: callback 리턴값을 JSON 으로 받음
  // 이 값이 포함되지 않을 경우 기존의 V1 버전의 데이터가 전달됩니다.
  callbackVersion?: string;
  // 결제 금액 중 과세금액
  amountTaxable?: number;
  // 결제 금액 중 부가세
  // 값이 없으면 환불할 과세금액을 11로 나눈 후 소수점 첫째 자리에서 올림으로 계산합니다.
  amountVat?: number;
  // 결제 금액 중 봉사료
  amountServiceFee?: number;
  // 결제 만료 기한 (기본값 10분, 최대 60분 설정 가능)
  // 형식 : 2020-03-03 12:30:20
  expiredTime?: string;
  // 현금영수증 발급 가능 여부
  // 기본값이 true 이기 때문에 현금영수증 사용 시 별도로 선언하지 않아도 됨.
  cashReceipt?: boolean;
  cashReceiptTradeOption?: // 문화비
  | "CULTURE"
    // 일반(default)
    | "GENERAL"
    // 교통비
    | "PUBLIC_TP";
  // 결제수단 구분변
  enablePayMethods?: string;
  // 결제창에 특정 카드만 노출하고 싶은 경우
  // ex) 삼성카드, 현대카드만 노출하고 싶은 경우
  //     {"options": [{"cardCompanyCode":3},{"cardCompanyCode":5}]}
  cardOptions?: {
    options: {
      cardCompanyCode: number;
    }[];
  };
  // 할부 제한 타입
  // 신용카드 결제 시, 사용자의 할부 선택을 제한할 수 있음.
  installment?: "USE" | "NOT_USE";
}
export interface TossPayReadyResponse extends TossPaySuccessResponse {
  status: number;
  checkoutPage: string; // 결제를 진행할 수 있는 토스 결제 웹페이지 URL입니다. 상점에서는 이 URL을 사용자에게 띄워주세요.
  payToken: string; // 거래를 구분할 수 있는 토스 고유 값
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
export interface TossPayBillingKeyCheckParam {
  userId: string;
  displayId: string;
}
export interface TossPayBillingKeyCheckResponse extends TossPaySuccessResponse {
  status: TossPayBillingKeyStatus;
  userId: string;
  displayId: string;
  billingKey: string;
  payMethod: TossPayPayMethod;
  cardCompanyNo?: string;
  cardCompanyName?: string;
  accountBankCode?: string;
  accountBankName?: string;
}
export interface TossPayGetPaymentParam {
  payToken: string;
}
export interface TossPayGetPaymentResponse extends TossPaySuccessResponse {
  // 결제 고유 토큰
  payToken: string;
  // 상점의 주문번호
  orderNo: string;
  // 결제 상태
  payStatus: TossPayPaymentStatus;
  // 결제 수단
  payMethod: TossPayPayMethod;
  // 결제 요청금액
  amount: number;
  // 거래 트랜잭션 목록
  transactions: {
    stepType: string;
    transactionId: string;
    transactionAmount: number;
    discountAmount: number;
    pointAmount: number;
    paidAmount: number;
    regTs: string;
  }[];
  // 최초 결제요청 시간
  createdTs: string;
  // 결제 완료 처리 시간
  paidTs: string;
}
export interface TossPayCancelParam {
  // 토스 결제 토큰
  payToken: string;
  // 환불 번호
  refundNo?: string;
  // 환불 사유
  reason?: string;
  // 환불할 금액
  amount?: number;
  // 환불할 금액 중 비과세금액
  amountTaxFree?: number;
  // 환불할 금액 중 과세금액
  amountTaxable?: number;
  // 환불할 금액 중 부가세
  amountVat?: number;
  // 환불할 금액 중 봉사료
  amountServiceFee?: number;
}
export interface TossPayCancelResponse extends TossPaySuccessResponse {
  // 환불 번호
  refundNo: string;
  // 환불 가능 금액
  refundableAmount: number;
  // 할인된 금액
  discountedAmount: number;
  // 지불수단 승인금액

  // 환불요청 금액
  refundedAmount: number;
  // paidPoint: number;
  // 환불요청 금액 중 실 차감된 즉시할인 금액
  // 환불요청 시 전달한 amount 금액 중 토스 서버에서 자동 차감된 즉시할인 금액으로 차감액이 없으면 0으로 리턴됩니다.
  refundedDiscountAmount: number;
  // 환불요청 금액 중 실 차감된 지불수단 금액
  // 환불요청 시 전달한 amount 금액 중 토스 서버에서 자동 차감된 지불수단 금액으로 차감액이 없으면 0으로 리턴됩니다.
  refundedPaidAmount: number;
  // 결제건의 환불 처리 시간 (yyyy-MM-dd HH:mm:ss)
  approvalTime: string;
  // 환불된 결제토큰
  payToken: string;
  // 거래 트랜잭션 아이디
  // 환불된 거래건의 매출전표 확인을 위하여 필요한 옵션 값이므로 가맹점의 관리가 필요합니다.
  transactionId: string;
}
