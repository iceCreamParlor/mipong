export enum TossPaymentsAPI {
  ApproveOnetime,
}
export interface TossPaymentsApproveOnetimeParam {
  paymentKey: string;
  orderId: string;
  amount: number;
}
export interface TossPaymentsFailResponse {
  code: string;
  message: string;
}
