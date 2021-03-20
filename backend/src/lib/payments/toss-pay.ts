import { Param } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as _ from 'lodash';
import { PaymentType, withPaymentResponse } from '../misc/payment';
export class TossPayService {
  private _tossAxios: AxiosInstance;
  private pg: PaymentType = 'tosspay';
  static instance: TossPayService | undefined = undefined;
  /**
   * Singleton Design
   * @param apiKey
   * @returns
   */
  static getInstance(autoExecute?: boolean, apiKey?: string) {
    autoExecute = !!autoExecute;
    if (this.instance === undefined) {
      this.instance = new TossPayService(autoExecute, apiKey);
    }
    return this.instance;
  }
  /**
   * Constructor
   * @param autoExecute
   * @param apiKey
   */
  constructor(private autoExecute: boolean, private apiKey?: string) {
    apiKey = apiKey ?? this.getApiKey();

    this._tossAxios = axios.create({
      baseURL: 'https://pay.toss.im',
      headers: {
        // Authorization: `Basic ${this.convert2Base64(secretKey + ':')}`,
        'Content-Type': 'application/json',
      },
      timeout: 10 * 1000,
    });
  }
  // TODO 테스트 필요
  /**
   * 토스 결제 생성을 요청
   * @param param
   * @returns
   */
  async createPayment(
    param: TossPayCreatePaymentParam,
  ): Promise<TossPayResponse<TossPayCreatePaymentResponse>> {
    let requestParam = {
      ...param,
      autoExecute: this.autoExecute,
      apiKey: this.apiKey,
    };
    return withPaymentResponse(
      this.pg,
      async () => await this._tossAxios.post('/api/v2/payments', requestParam),
    );
  }
  /**
   * 결제 승인.
   * 구매자 인증이 완료된 "대기" 상태에서 재고상태 확인 후 결제를 진행할 수 있다.
   * @param payToken
   * @returns
   */
  async approvePayment(payToken: string) {
    const requestParam = {
      apiKey: this.apiKey,
      payToken: payToken,
    };
    return withPaymentResponse(
      this.pg,
      async () => await this._tossAxios.post('/api/v2/execute', requestParam),
    );
  }
  /**
   * * 환불하기
   * 결제 완료 건의 결제 금액 일부 또는 전부를 구매자에게 돌려줍니다.
   * 환불 요청에 성공하는 즉시, 토스 머니로 결제된 거래건은 구매자의 계좌로 요청하신 금액이 입금되며,
   * 카드결제 거래건은 승인취소됩니다.
   * 환불한 금액은 상점의 다음 정산에 반영됩니다.
   * @param param
   * @returns
   */
  async cancelPayment(
    param: TossPayCancelPaymentParam,
  ): Promise<TossPayResponse<TossPayCancelPaymentResponse>> {
    const requestParam = {
      ...param,
      apiKey: this.apiKey,
    };
    return withPaymentResponse(
      this.pg,
      async () => await this._tossAxios.post('/api/v2/refunds', requestParam),
    );
  }
  /**
   * 단건결제 조회
   * @param payToken
   */
  async getPayment(
    payToken: string,
  ): Promise<TossPayResponse<TossPayGetPaymentResponse>> {
    const requestParam = {
      apiKey: this.apiKey,
      payToken: payToken,
    };
    return withPaymentResponse(
      this.pg,
      async () => await this._tossAxios.post('/api/v2/status', requestParam),
    );
  }
  /**
   * 신용카드 매출전표 확인
   * 결제대기(PAY_APPROVED) 혹은 결제취소(PAY_CANCEL) 등의 미완료 거래건은 확인이 불가합니다.
   * 트랜잭션 코드 값은 필수 값이 아니므로 특정 상태를 확인하고 싶을 때 옵션 값으로 활용해 주세요
   * @param param
   * @returns
   */
  async getCreditcardSales(param: {
    payToken: string;
    transactionId?: string;
  }) {
    let requestUrl = `https://pay.toss.im/payfront/web/external/sales-check?payToken=${param.payToken}`;
    if (param.transactionId) {
      requestUrl = `${requestUrl}&transactionId=${param.transactionId}`;
    }
    return withPaymentResponse(
      this.pg,
      async () => await axios.post(requestUrl),
    );
  }
  get tossAxios(): AxiosInstance {
    return this._tossAxios;
  }
  getApiKey = (): string => {
    const apiKey = process.env.TOSS_PAY_API_KEY;
    if (apiKey === undefined || apiKey === '') {
      throw new Error('TOSS_API_KEY is Empty');
    }
    return apiKey;
  };
  /**
   * 문자열을 Base64 로 인코딩
   * @param str
   */
  convert2Base64(str: string): string {
    return Buffer.from(str).toString('base64');
  }
}
export interface TossPaySuccess<T> extends PaymentResponse {
  success: true;
  pg: 'toss';
  data: T;
}
export interface TossPayFail {
  success: false;
  pg: 'toss';
  data: {
    code: string;
    message: string;
  };
}
export interface TossPayCreatePaymentParam {
  // 고유 주문번호
  orderNo: string;
  // 결제 금액
  amount: number;
  // 비과세 금액
  amountTaxFree: number;
  // 상품 정보
  productDesc: string;
  // 결제 결과 callback 웹 URL (필수-자동승인설정 true의 경우)
  resultCallback?: string;
  // 결제 완료 후 연결할 웹 URL (필수)
  retUrl: string;
  // 결제 취소 시 연결할 웹 URL (필수)
  retCancelUrl: string;
  // callback 버전 (필수-자동승인설정 true의 경우)
  callbackVersion?: string;
  // 결제 금액 중 과세금액
  amountTaxable?: number;
  // 결제 금액 중 부가세
  amountVat?: number;
  // 결제 금액 중 봉사료
  amountServiceFee?: number;
  // 결제 만료 예정 시각
  expiredTime?: string;
  // 현금영수증 발급 가능 여부
  cashReceipt?: boolean;
}
export interface TossPayCreatePaymentResponse {
  code: number;
  checkoutPage: string;
  payToken: string;
}
export interface TossPayCancelPaymentParam {
  payToken: string;
  amount: number;
  amountTaxable: number;
  amountTaxFree: number;
  amountVat: number;
  amountServiceFee: number;
  reason?: string;
}
export interface TossPayCancelPaymentResponse {
  // 0: 성공, -1: 실패
  code: number;
  refundNo: string;
  refundableAmount: number;
  discountedAmount: number;
  paidPoint: number;
  paidAmount: number;
  refundedAmount: number;
  refundedDiscountAmount: number;
  refundedPoint: number;
  refundedPaidAmount: number;
  approvalTime: string;
  payToken: string;
  transactionId: string;
  msg: string;
  errorCode: string;
}
export interface TossPayGetPaymentResponse {
  // 응답 코드 (성공하면 0)
  code: number;
  // 결제 고유 토큰
  payToken: string;
  // 상점의 주문번호
  orderNo: string;
  // 결제 상태
  payStatus:
    | 'PAY_STANDBY'
    | 'PAY_APPROVED'
    | 'PAY_CANCEL'
    | 'PAY_PROGRESS'
    | 'PAY_COMPLETE'
    | 'REFUND_PROGRESS'
    | 'REFUND_SUCCESS'
    | 'SETTLEMENT_COMPLETE'
    | 'SETTLEMENT_REFUND_COMPLETE';
  // 결제 수단
  payMethod: string;
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
type TossPayResponse<T> = TossPaySuccess<T> | TossPayFail;
