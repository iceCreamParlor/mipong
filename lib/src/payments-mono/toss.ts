import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  PaymentType,
  PaymentResponse,
  PaymentSerivce,
  withPaymentResponse,
  PaymentParam,
  getSecret,
} from "../misc/payment";
import * as _ from "lodash";
export class TossService implements PaymentSerivce {
  private _tossAxios: AxiosInstance;
  private static _instance: TossService | undefined = undefined;
  private _pg: PaymentType = "toss";

  static BUILD(clientId?: string, secretKey?: string): TossService {
    const { toss } = getSecret();
    clientId = clientId ?? toss.clientId;
    secretKey = secretKey ?? toss.secretKey;

    if (clientId === undefined || secretKey === undefined) {
      throw new Error("(TOSS) Invalid Api Key");
    }

    return new TossService(clientId, secretKey);
  }

  constructor(private clientId: string, private secretKey: string) {
    this._tossAxios = axios.create({
      baseURL: "https://api.tosspayments.com",
      headers: {
        Authorization: `Basic ${this.convert2Base64(secretKey + ":")}`,
        "Content-Type": "application/json",
      },
      timeout: 10 * 1000,
    });
  }
  /**
   * Singleton Design
   * @param clientId
   * @param secretKey
   * @returns
   */
  public static getInstance(clientId?: string, secretKey?: string) {
    if (this._instance === undefined) {
      this._instance = this.BUILD(clientId, secretKey);
    }
    return this._instance;
  }
  /**
   * 일회구매 결제 승인
   * @param param
   */
  async approveOnetime(
    param: TossApproveParam
  ): Promise<TossResponse<TossApproveResponse>> {
    const approveParam = _.pickBy(param, _.identity);
    delete approveParam.paymentKey;
    return withPaymentResponse(this._pg, async () =>
      this._tossAxios.post(`/v1/payments/${param.paymentKey}`, approveParam)
    );
  }
  /**
   * 결제 취소
   * @param param
   */
  async cancelPayment(
    param: TossCancelParam
  ): Promise<TossResponse<TossCancelResponse>> {
    return withPaymentResponse(this._pg, async () =>
      this._tossAxios.post(`/v1/payments/${param.paymentKey}/cancel`, param)
    );
  }
  /**
   * 단건결제 조회
   * @param paymentKey
   */
  async getPayment(
    paymentKey: string
  ): Promise<TossResponse<TossApproveResponse>> {
    return withPaymentResponse(this._pg, async () =>
      this._tossAxios.get(`/v1/payments/${paymentKey}`)
    );
  }

  /**
   * 정기결제 빌링키 발급
   * @param str
   * @returns
   */
  async registerSubscription(
    param: TossRegisterSubscriptionParam
  ): Promise<TossResponse<TossRegisterSubscriptionResponse>> {
    const getBillingKeyParam = _.pickBy(param, _.identity);

    return withPaymentResponse(this._pg, async () =>
      this._tossAxios.post(
        `/v1/billing/authorizations/${param.authKey}`,
        getBillingKeyParam
      )
    );
  }
  /**
   * 정기결제 승인 API
   * @param param
   * @returns
   */
  async approveSubscription(
    param: TossSubscriptionApproveParam
  ): Promise<TossResponse<TossApproveResponse>> {
    const approveParam = _.pickBy(param, _.identity);
    delete approveParam.billingKey;

    return withPaymentResponse(this._pg, async () =>
      this._tossAxios.post(`/v1/billing/${param.billingKey}`, approveParam)
    );
  }
  /**
   * 키인 방식으로 빌링키 발급
   * @param param
   * @returns
   */
  async getSubscriptionBillingKeyWithCard(
    param: TossSubscriptionGetBillingKeyWithCardParam
  ): Promise<TossResponse<TossRegisterSubscriptionResponse>> {
    const getBillingKeyParam = _.pickBy(param, _.identity);
    return withPaymentResponse(this._pg, async () =>
      this._tossAxios.post("v1/billing/authorizations/card", param)
    );
  }
  /**
   * 카드 프로모션 조회
   * @returns
   */
  async getCardPromition(): Promise<TossResponse<TossCardPromotionResponse>> {
    return withPaymentResponse(this._pg, async () =>
      this._tossAxios.get("/v1/promotions/card")
    );
  }

  /**
   * 문자열을 Base64 로 인코딩
   * @param str
   */
  convert2Base64(str: string): string {
    return Buffer.from(str).toString("base64");
  }
}
export interface TossApproveParam extends PaymentParam {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export type TossBankCode =
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
export interface TossCancelParam extends PaymentParam {
  paymentKey: string;
  cancelReason: string;
  cancelAmount?: number;
  refundReceiveAccount?: {
    bank: TossBankCode;
    accountNumber: string;
    holderName: string;
  };
  taxAmount?: number;
  taxFreeAmount?: number;
  refundableAmount?: number;
}
/**
 * 정기결제, 일반결제 모두 동일한 형태를 사용한다.
 */
export interface TossApproveResponse {
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
  card: {
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
  virtualAccount: any;
  cashReceipt: any;
  cancels: any[];
  secret: string;
}

export type TossPaymentStatus =
  | "READY"
  | "IN_PROGRESS"
  | "WAITING_FOR_DEPOSIT"
  | "DONE"
  | "CANCELED"
  | "ABORTED"
  | "PARTIAL_CANCELED";
export interface TossCancelResponse {
  paymentKey: string;
  orderId: string;
  mId: string;
  currency: string;
  method: string;
  totalAmount: number;
  balanceAmount: number;
  status: TossPaymentStatus;
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
    bank: TossBankCode;
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
export interface TossRegisterSubscriptionParam extends PaymentParam {
  authKey: string;
  customerKey: string;
}
export interface TossRegisterSubscriptionResponse {
  mId: string;
  customerKey: string;
  authenticatedAt: string;
  method: string;
  billingKey: string;
  cardCompany: string;
  cardNumber: string;
}
export interface TossSubscriptionApproveParam extends PaymentParam {
  billingKey: string;
  amount: number;
  customerKey: string;
  orderId: string;
  customerEmail?: string;
  customerName?: string;
  orderName?: string;
}
export interface TossSubscriptionGetBillingKeyWithCardParam {
  // 카드번호
  cardNumber: string;
  // 카드 유효 년도 (2자리)
  cardExpirationYear: string;
  // 카드 유효 월 (2자리)
  cardExpirationMonth: string;
  // 카드 비밀번호 앞 2자리
  cardPassword: string;
  // 사용자 생년월일 6자리 (YYMMDD) 또는 사업자번호 10자리
  customerBirthday: string;
  // 고객 고유 ID
  customerKey: string;
}
export interface TossCardPromotionResponse {
  discountCards: [
    {
      cardCompany: string;
      discountAmount: number;
      balance: number;
      discountCode: string;
      dueDate: string;
      maximumPaymentAmount: number;
      minimumPaymentAmount: number;
    }
  ];
  interestFreeCards: [
    {
      cardCompany: string;
      dueDate: string;
      installmentFreeMonths: number[];
      minimumPaymentAmount: number;
    }
  ];
}
export interface TossSuccess<T> extends PaymentResponse {
  success: true;
  statusCode: number;
  pg: "toss";
  data: T;
}
export interface TossFail {
  success: false;
  statusCode: number;
  pg: "toss";
  data: {
    code: string;
    message: string;
  };
}
type TossResponse<T> = TossSuccess<T> | TossFail;