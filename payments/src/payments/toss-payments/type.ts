export enum TossPaymentsAPI {
  ApproveOnetime,
  CancelPayment,
  GetPayment,
  RegisterSubscription,
  ApproveSubscription,
}
export interface TossPaymentsFailResponse {
  code: string;
  message: string;
}
export interface TossPaymentsApproveParam {
  /*! 결제 승인을 위해 사용되는 키 값입니다. 이 키를 이용해 결제 승인 API를 요청할 수 있습니다. */
  paymentKey: string;
  /*! requestPayment(결제창 호출)를 호출할 때 파라미터로 넘겼던 orderId 가 돌아옵니다. */
  orderId: string;
  /*! 사용자가 실제로 결제한 금액입니다. */
  amount: number;
}
export interface TossPaymentsApproveResponse {
  paymentKey: string;
  orderId: string;
  mId: string;
  currency: string;
  method: string;
  totalAmount: number;
  balanceAmount: number;
  status: string;
  requestedAt: string;
  approvedAt: string;
  useDiscount: boolean;
  discount: any;
  useEscrow: boolean;
  useCashReceipt: boolean;
  card?: {
    company: string;
    number: string;
    installmentPlanMonths: number;
    approveNo: string;
    useCardPoint: boolean;
    cardType: string;
    ownerType: string;
    receiptUrl: string;
    acquireStatus: string;
    isInterestFree: boolean;
  };
  virtualAccount?: {
    accountNumber: string;
    bank: string;
    customerName: string;
    dueDate: string;
  };
  cashReceipt: any;
  cancels: any[];
  secret?: string;
}
export interface TossPaymentsCancelPaymentParam {
  paymentKey: string;
  cancelReason: string;
  cancelAmount: number;
  refundReceiveAccount?: TossPaymentsVBankCancelParam;
  taxAmount?: number;
  taxFreeAmount?: number;
  refundableAmount?: number;
}
export interface TossPaymentsCancelPaymentResponse {
  paymentKey: string;
  orderId: string;
  mId: string;
  currency: string;
  method: string;
  totalAmount: number;
  balanceAmount: number;
  status:
    | "READY"
    | "IN_PROGRESS"
    | "WAITING_FOR_DEPOSIT"
    | "DONE"
    | "CANCELED"
    | "ABORTED"
    | "PARTIAL_CANCELED";
  requestedAt: string;
  approvedAt?: string;
  useDiscount: boolean;
  discountAmount?: number;
  useEscrow: boolean;
  useCashReceipt: boolean;
  cancels?: {
    cancelAmount: number;
    calcelReason: string;
    taxFreeAmount: number;
    taxAmount?: number;
    refundableAmount: number;
    canceledAt: string;
  };
  card?: {
    company: string;
    number: string;
    installmentPlanMonths: number;
    approveNo: string;
    useCardPoint: boolean;
    cardType: string;
    ownerType: string;
    acquiredStatus:
      | "READY"
      | "REQUESTED"
      | "COMPLETED"
      | "CANCEL_REQUESTED"
      | "CANCELED";
  };
  receiptUrl: string;
  isInterestFree: boolean;
  secret?: string;
  virtualAccount?: {
    accountNumber: string;
    bank: string;
    customerName: string;
    dueDate: string;
    refundStatus:
      | "NONE"
      | "FAILED"
      | "PENDING"
      | "PARTIAL_FAILED"
      | "COMPLETED";
  };
  mobilePhone?: {
    customerMobilePhone: string;
  };
  giftCertificate?: {
    approveNo: string;
  };
  cashReceipt?: {
    type: string;
    amount: number;
    taxFreeAmount: number;
    issueNumber: string;
    receiptUrl: string;
  };
}
export interface TossPaymentsGetPaymentParam {
  paymentKey: string;
}
export interface TossPaymentsGetPaymentResponse {
  /*! 5zJ4xY7m0kODnyRpQWGrN2xqGlNvLrKwv1M9ENjbeoPaZdL6 */
  paymentKey: string;
  /*! XgI8XiCXG4tZeUmh05PT3 */
  orderId: string;
  /*! vivarepublica */
  mId: string;
  /*! KRW */
  currency: string;
  /*! 카드 */
  method: string;
  /*! 15000 */
  totalAmount: number;
  /*! 15000 */
  balanceAmount: number;
  /*! DONE */
  status: string;
  /*! 2020-09-25T10:41:35+09:00 */
  requestedAt: string;
  /*! 2020-09-25T10:44:39.846+09:00 */
  approvedAt: "2020-09-25T10:44:39.846+09:00";
  /*! false */
  useDiscount: false;
  /*! null */
  discount: null;
  /*! false */
  useEscrow: false;
  /*! false */
  useCashReceipt: false;
  card: any;
  /*! null */
  virtualAccount: null;
  /*! null */
  cashReceipt: null;
  cancels: [];
  /*! null */
  secret: null;
}
export interface TossPaymentsRegisterSubscriptionParam {
  authKey: string;
  customerKey: string;
}
export interface TossPaymentsRegisterSubscriptionResponse {
  mId: string;
  customerKey: string;
  authenticatedAt: string;
  method: string;
  billingKey: string;
  cardCompany: string;
  cardNumber: string;
}
export interface TossPaymentsApproveSubscriptionParam {
  billingKey: string;
  amount: number;
  customerKey: string;
  orderId: string;
  customerEmail?: string;
  customerName?: string;
  orderName?: string;
}
export type TossPaymentsApproveSubscriptionResponse =
  TossPaymentsApproveResponse;
export interface TossPaymentsVBankCancelParam {
  bank: string;
  accountNumber: string;
  holderName: string;
}
export type TossPaymentsBankCode =
  | "농협"
  | "국민"
  | "우리"
  | "신한"
  | "기업"
  | "하나"
  | "경남"
  | "대구"
  | "부산"
  | "수협"
  | "우체국";
