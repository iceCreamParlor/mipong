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
export type TossPayPayMethod = "TOSS_MONEY" | "CARD";
export interface TossPayFailResponse {
  result: number;
  msg: string;
  code: -1;
  errorCode: string;
  status: number;
}
export interface TossPayApproveOnetimeParam {
  payToken: string;
  orderNo: string;
}
export interface TossPayBillingKeyCheckParam {
  userId: string;
  displayId: string;
}
export interface TossPayBillingKeyCheckResponse {
  code: 0;
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
