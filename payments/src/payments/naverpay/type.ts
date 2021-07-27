export enum NaverPayAPI {
  ApproveOnetime,
  GetPayment,
  CancelPayment,
  PrepareRegisterSubscription,
  RegisterSubscription,
  InactivateSubscription,
  CheckSubscription,
  ReserveSubscription,
  ApproveSubscription,
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
/*! 네이버페이는 성공시에만 code 에 "Success" 가 오고 실패시에는 code 에 실패코드가 넘어옴. */
type NaverpayFailCode =
  | "Fail"
  | "InvalidMerchant"
  | "TimeExpired"
  | "AlreadyOnGoing"
  | "AlreadyComplete"
  | "OwnerAuthFail";

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
export interface NaverPayCancelPaymentParam {
  /*! 네이버페이 결제번호 */
  paymentId: string;
  /*! 가맹점의 결제 번호 */
  merchantPayKey?: string;
  /*! 취소 요청 금액 */
  cancelAmount: number;
  /*! 취소 사유 */
  cancelReason: string;
  /*! 취소 요청자(1: 구매자, 2: 가맹점 관리자) 구분이 애매한 경우 가맹점 관리자로 입력합니다 */
  cancelRequester: 1 | 2;
  /*! 과세 대상 금액. 과세 대상 금액 + 면세 대상 금액 = 총 결제 금액 */
  taxScopeAmount: number;
  /*! 면세 대상 금액. 과세 대상 금액 + 면세 대상 금액 = 총 결제 금액 */
  taxExScopeAmount: number;
  /*! 가맹점의 남은 금액과 네이버페이의 남은 금액이 일치하는지 체크하는 기능을 수행할지 여부 */
  /*! 1: 수행 0: 미수행 */
  doCompareRest?: 0 | 1;
  /*!
   * 이번 취소가 수행되고 난 후에 남을 가맹점의 예상 금액
   * 옵션 파라미터인 doCompareRest값이 1일 때에만 동작합니다
   * Ex)
   * 결제금액 1000원 중 200원을 취소하고 싶을 때 =>
   * expectedRestAmount =800원, cancelAmount=200원으로 요청
   **/
  expectedRestAmount?: number;
}
export interface NaverPayCancelPaymentResponse {
  code: "Success";
  message: string;
  body: {
    /*! 네이버페이 결제번호 */
    paymentId: string;
    /*! 취소 결제 번호
     * 결과코드가 CancelNotComplete 인 경우, empty string 이 전달되며
     * 취소가 완료된 이후에 결제내역조회 API를 통해서 확인 가능합니다.
     */
    payHistId: string;
    /*! 취소 처리된 주 결제 수단(CARD: 신용카드, BANK: 계좌 이체) */
    primaryPayMeans: string;
    /*! 주 결제 수단 취소 금액 */
    primaryPayCancelAmount: number;
    /*! 추가로 취소 가능한 주 결제 수단 잔여 결제 금액 */
    primaryPayRestAmount: number;
    /*! 네이버페이 포인트 취소 금액 */
    npointCancelAmount: number;
    /*! 추가로 취소 가능한 네이버페이 포인트 잔여 결제 금액 */
    npointRestAmount: number;
    /*! 기프트카드 취소 금액, 간편결제에만 존재 */
    giftCardCancelAmount?: number;
    /*! 추가로 취소 가능한 기프트카드 잔여 결제 금액, 간편결제에만 존재 */
    giftCardRestAmount?: number;
    /*! 과세 취소 금액 */
    taxScopeAmount: number;
    /*! 면세 취소 금액 */
    taxExScopeAmount: number;
    /*! 추가로 취소 가능한 과세 잔여 결제 금액 */
    taxScopeRestAmount: number;
    /*! 추가로 취소 가능한 면세 잔여 결제 금액 */
    taxExScopeRestAmount: number;
    /*!
     * 취소 일시(YYYYMMDDHH24MMSS)
     * 결과코드가 CancelNotComplete 인 경우, 취소실패 일시가 전달되며
     * 정확한 취소 일시는 취소가 완료된 이후에 결제내역조회 API를 통해서 확인 가능합니다.
     * */
    cancelYmdt: string;
    /*! 추가로 취소 가능한 전체 잔여 결제 금액(primaryPayRestAmount + npointRestAmount) */
    totalRestAmount: number;
  };
}
export interface NaverPayGetPaymentParam {
  /*! 조회하고자 하는 네이버페이 결제번호 */
  /*! 결제번호를 입력값으로 선택하면 startTime, endTime, pageNumber, rowsPerPage 파라미터 값은 무시됩니다 */
  paymentId?: string;
  /*! 검색 시작 일시(YYYYMMDDHH24MMSS) */
  /*! 검색 기간(startTime과 endTime 사이의 시간)은 31일 이내여야 합니다 */
  startTime?: string;
  /*! 검색 종료 일시(YYYYMMDDHH24MMSS) */
  /*! 검색 기간(startTime과 endTime 사이의 시간)은 31일 이내여야 합니다 */
  endTime?: string;
  /*! ALL:전체, APPROVAL:승인, CANCEL:취소 */
  approvalType?: "ALL" | "APPROVAL" | "CANCEL";
  /*! 조회하고자 하는 페이지번호 */
  /*! 값이 없으면 1로 간주합니다 */
  pageNumber?: number;
  /*! 페이지 당 row 건수 */
  /*! 1~100까지 지정 가능하며, 값이 없으면 20으로 간주합니다 */
  rowsPerPage?: number;
  /*! 1: 해당 그룹에 속한 모든 가맹점의 결제내역을 조회 할 수 있습니다 */
  /*! 일반 개별 가맹점에서는 사용 할 수 없고, 그룹형 마스터 가맹점만 사용 가능한 옵션입니다 */
  collectChainGroup?: number;
}
export interface NaverPayGetPaymentResponse {
  code: "Success";
  message: string;
  body: {
    list: Array<NaverPayPaymentHistory>;
  };
}
interface NaverPayPaymentHistory {
  paymentId: string;
  payHisId: string;
  merchantId: string;
  merchantName: string;
  merchantPayKey: string;
  merchantUserKey: string;
  admissionTypeCode: string;
  admissionYmdt: string;
  tradeConfirmYmdt: string;
  admissionState: string;
  totalPayAmount: number;
  primaryPayAmount: number;
  npointPayAmount: number;
  giftCardPayAmount: number;
  taxScopeAmount: number;
  taxExScopeAmount: number;
  primaryPayMeans: string;
  cardCorpCode: string;
  cardNo: string;
  cardAuthNo: string;
  cardInstCount: number;
  usedCardPoint: boolean;
  bankCorpCode: string;
  bankAccountNo: string;
  productName: string;
  extraDeduction: boolean;
  useCfmYmdt: string;
  settleInfo: any;
}
export interface NaverPayPrepareRegisterSubscriptionParam {
  actionType: "NEW" | "CHANGE";
  targetRecurrentId?: string;
  productCode: string;
  productName: string;
  totalPayAmount: number;
  returnUrl: string;
}
export interface NaverPayPrepareRegisterSubscriptionResponse {
  code: "Success";
  message: string;
  body: {
    reserveId: string;
  };
}
export interface NaverPayRegisterSubscriptionParam {
  reserveId: string;
  tempReceiptId: string;
}
export interface NaverPayRegisterSubscriptionResponse {
  code: "Success";
  message: string;
  body: {
    reserveId: string;
    tempReceiptId: string;
    recurrentId: string;
    actionType: string;
    preRecurrentId: string;
  };
}
export interface NaverPayInactivateSubscriptionParam {
  /*! 해지할 정기/반복결제 등록 번호 */
  recurrentId: string;
  /*! 해지 요청자(1: 구매자, 2: 가맹점 관리자) */
  /*! 구분하기 어려우면 가맹점 관리자로 입력합니다 */
  expireRequester: 1 | 2;
  /*! 해지 사유 */
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
  /*! 조회하고자 하는 정기/반복결제 등록 번호 */
  /*! 정기/반복결제 등록번호를 입력값으로 선택하면 startTime, endTime, pageNumber, rowsPerPage 파라미터 값은 무시됩니다 */
  recurrentId?: string;
  /*! 등록 시작 일시(YYYYMMDDHH24MMSS) */
  /*! 검색 기간(startTime과 endTime 사이의 시간)은 31일 이내여야 합니다 */
  startTime?: string;
  /*! 등록 종료 일시(YYYYMMDDHH24MMSS) */
  /*! 검색 기간(startTime과 endTime 사이의 시간)은 31일 이내여야 합니다 */
  endTime?: string;
  /*! VALID: 유효, EXPIRED: 만료, ALL: 전체값이 없으면 ALL로 간주합니다 */
  state?: "VALID" | "EXPIRED" | "ALL";
  /*! 조회하고자 하는 페이지번호 */
  /*! 값이 없으면 1로 간주합니다 */
  pageNumber?: number;
  /*! 페이지 당 row 건수 */
  /*! 1~100까지 지정 가능하며, 값이 없으면 20으로 간주합니다 */
  rowsPerPage?: number;
}
export interface NaverPayCheckSubscriptionResponse {
  code: "Success";
  message: string;
  body: {
    list: {
      recurrentId: string;
      productCode: string;
      naverPointUse: string;
      primaryPayMeans: string;
      primaryPayMeansCorpCd: string;
      primaryPayMeansNo: string;
      recurrentState: string;
      registYmdt: string;
      expireYmdt: string;
    }[];
    totalCount: number;
    responseCount: number;
    totalPageCount: number;
    currentPageNumber: number;
  };
}
export interface NaverPayReserveSubscriptionParam {
  /*! 정기/반복결제 등록 번호 */
  recurrentId: string;
  /*! 총 결제 금액 */
  totalPayAmount: number;
  /*! 과제 대상 금액 */
  taxScopeAmount: number;
  /*! 면세 대상 금액 */
  taxExScopeAmount: number;
  /*! 상품명 */
  productName: string;
  /*! 가맹점 주문내역 확인 가능한 가맹점 결제번호 또는 주문번호 */
  merchantPayId: string;
  /*! 가맹점 주문내역 확인 가능한 가맹점 결제번호 또는 주문번호 */
  merchantUserId: string;
  /*! 이용완료일(yyyymmdd) */
  useCfmYmdt?: string;
}
export interface NaverPayReserveSubscriptionResponse {
  code: "Success";
  message: string;
  body: {
    recurrentId: string;
    paymentId: string;
  };
}
export interface NaverPayApproveSubscriptionParam {
  recurrentId: string;
  paymentId: string;
}
export interface NaverPayApproveSubscriptionResponse {
  code: "Success";
  message: string;
  body: {
    recurrentId: string;
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
