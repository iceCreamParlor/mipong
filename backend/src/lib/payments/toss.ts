import axios, { AxiosInstance } from 'axios';
import { AnyTxtRecord } from 'dns';
import { isEmpty } from '../misc/string';

export class TossService {
  private _tossAxios: AxiosInstance;

  constructor(private clientId?: string, private secretKey?: string) {
    clientId = clientId ?? this.getClientId();
    secretKey = secretKey ?? this.getSecretKey();

    this._tossAxios = axios.create({
      baseURL: 'https://api.tosspayments.com',
      headers: {
        Authorization: `Basic ${this.convert2Base64(secretKey + ':')}`,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * 일회구매 결제 승인
   * @param param
   */
  async approveOneTime(
    param: TossApproveParam,
  ): Promise<TossOnetimeApproveResponse> {
    return (
      await this._tossAxios.post(`/v1/payments/${param.paymentKey}`, param)
    ).data;
  }

  /**
   * TODO 테스트 필요
   * 단건결제 취소
   * @param param
   */
  async cancelOneTime(param: TossOnetimeCancelParam) {
    return (
      await this._tossAxios.post(`/v1/payments/${param.paymentKey}/cancel`)
    ).data;
  }
  /**
   * TODO 테스트 필요
   * 단건결제 조회
   * @param paymentKey
   */
  async getOnetime(paymentKey: string) {
    return (await this._tossAxios.get(`/v1/payments/${paymentKey}`)).data;
  }
  /**
   * 문자열을 Base64 로 인코딩
   * @param str
   */
  convert2Base64(str: string): string {
    return Buffer.from(str).toString('base64');
  }

  get tossAxios(): AxiosInstance {
    return this._tossAxios;
  }

  getSecretKey = (): string => {
    const secretKey = process.env.TOSS_SECRET_KEY;
    if (secretKey === undefined || isEmpty(secretKey)) {
      throw new Error('Toss Secret Key is Empty');
    }
    return secretKey;
  };

  getClientId = (): string => {
    const clientId = process.env.TOSS_CLIENT_ID;
    if (clientId === undefined || isEmpty(clientId)) {
      throw new Error('Toss Client Id is Empty');
    }
    return clientId;
  };
}

export interface TossApproveParam {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export interface TossOnetimeCancelParam {
  paymentKey: string;
  cancelReason: string;
  cancelAmount?: number;
  refundReceiveAccount?: {
    bank:
      | '농협'
      | '국민'
      | '우리'
      | '신한'
      | '기업'
      | '하나'
      | '경남'
      | '대구'
      | '부산'
      | '수협'
      | '우체국';
    accountNumber: string;
    holderName: string;
  };
  taxAmount?: number;
  taxFreeAmount?: number;
  refundableAmount?: number;
}
/*
{
  "paymentKey": "5zJ4xY7m0kODnyRpQWGrN2xqGlNvLrKwv1M9ENjbeoPaZdL6",
  "orderId": "ADZje8FJB4vNUmm1aUnlZ",
  "mId": "tvivarepublica",
  "currency": "KRW",
  "method": "카드",
  "totalAmount": 15000,
  "balanceAmount": 15000,
  "status": "DONE",
  "requestedAt": "2020-09-25T10:41:35+09:00",
  "approvedAt": "2020-09-25T10:44:39.846+09:00",
  "useDiscount": false,
  "discount": null,
  "useEscrow": false,
  "useCashReceipt": false,
  "card": {
    "company": "현대",
    "number": "949085******1312",
    "installmentPlanMonths": 0,
    "approveNo": "00000000",
    "useCardPoint": false,
    "cardType": "신용",
    "ownerType": "개인",
    "receiptUrl": "https://merchants.tosspayments.com/web/serve/merchant/test_ck_OEP59LybZ8Bdv6A1JxkV6GYo7pRe/receipt/5zJ4xY7m0kODnyRpQWGrN2xqGlNvLrKwv1M9ENjbeoPaZdL6",
    "acquireStatus": "READY",
    "isInterestFree": false
  },
  "virtualAccount": null,
  "cashReceipt": null,
  "cancels": [],
  "secret": null
}
*/
export interface TossOnetimeApproveResponse {
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
  secret: any;
}
