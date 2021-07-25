export enum NaverPayAPI {
  ApproveOnetime,
  GetPayment,
  CancelPayment,
  RegisterSubscription,
  InactivateSubscription,
  CheckSubscription,
  ReserveSubscription,
}
export interface NaverPayFailResponse {
  code: NaverpayFailCode;
  message: string;
}
export interface NaverPayResponse {
  code: NaverPaySuccessCode | NaverpayFailCode;
  message: string;
  body: any;
}
type NaverPaySuccessCode = "Success";
// 네이버페이는 성공시에만 code 에 "Success" 가 오고 실패시에는 code 에 실패코드가 넘어옴.
type NaverpayFailCode =
  | "Fail"
  | "InvalidMerchant"
  | "TimeExpired"
  | "AlreadyOnGoing"
  | "AlreadyComplete"
  | "OwnerAuthFail";

export interface NaverPayInactivateSubscriptionParam {
  // 해지할 정기/반복결제 등록 번호
  recurrentId: string;
  // 해지 요청자(1: 구매자, 2: 가맹점 관리자) 구분하기 어려우면 가맹점 관리자로 입력합니다
  expireRequester: string;
  expireReason: string;
}
export interface NaverPayInactivateSubscriptionResponse {
  code: "Success";
  message: string;
  body: {
    recurrentId: string;
  };
}

export interface NaverPayCheckSubscriptionParam {
  recurrentId: string;
  // VALID: 유효, EXPIRED: 만료, ALL: 전체값이 없으면 ALL로 간주합니다
  state?: "VALID" | "EXPIRED" | "ALL";
}
export interface NaverPayCheckSubscriptionResponse {
  code: "Success";
  message: string;
  body: {
    list: [
      {
        recurrentId: string;
        productCode: string;
        naverPointUse: string;
        primaryPayMeans: string;
        primaryPayMeansCorpCd: string;
        primaryPayMeansNo: string;
        recurrentState: string;
        registYmdt: string;
        expireYmdt: string;
      }
    ];
    totalCount: number;
    responseCount: number;
    totalPageCount: number;
    currentPageNumber: number;
  };
}
export interface NaverPayApproveOnetimeParam {
  paymentId: string;
}
export interface NaverPayApproveOnetimeResponse {
  code: "Success";
  message: string;
  body: {
    paymentId: string;
    detail: {
      productName: string;
      merchantId: string;
      merchantName: string;
      cardNo: string;
      admissionYmdt: string;
      payHistId: string;
      primaryPayAmount: number;
      npointPayAmount: number;
      giftCardAmount: number;
      totalPayAmount: number;
      primaryPayMeans: string;
      merchantPayKey: string;
      merchantUserKey: string;
      cardCorpCode: string;
      paymentId: string;
      admissionTypeCode: string;
      settleExpectAmount: number;
      payCommissionAmount: number;
      admissionState: string;
      tradeConfirmYmdt: string;
      cardAuthNo: string;
      cardInstCount: number;
      bankCorpCode: string;
      bankAccountNo: string;
      settleExpected: boolean;
      extraDeduction: boolean;
      useCfmYmdt: string;
    };
  };
}
