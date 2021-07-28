export enum TossPaymentsAPI {
  ApproveOnetime,
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
