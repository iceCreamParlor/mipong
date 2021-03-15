import axios, { AxiosInstance } from 'axios';
import * as _ from 'lodash';
export class TossPayService {
  private _tossAxios: AxiosInstance;
  static instance: TossPayService | undefined = undefined;
  /**
   * Singleton Design
   * @param clientId
   * @param secretKey
   * @returns
   */
  static getInstance(clientId?: string, secretKey?: string) {
    if (this.instance === undefined) {
      this.instance = new TossPayService(clientId, secretKey);
    }
    return this.instance;
  }

  constructor(private clientId?: string, private secretKey?: string) {
    clientId = clientId ?? this.getClientId();
    secretKey = secretKey ?? this.getSecretKey();

    this._tossAxios = axios.create({
      baseURL: 'https://pay.toss.im',
      headers: {
        Authorization: `Basic ${this.convert2Base64(secretKey + ':')}`,
        'Content-Type': 'application/json',
      },
      timeout: 10 * 1000,
    });
  }
  async createPayment() {}
  get tossAxios(): AxiosInstance {
    return this._tossAxios;
  }
  getSecretKey = (): string => {
    const secretKey = process.env.TOSS_SECRET_KEY;
    if (secretKey === undefined || secretKey === '') {
      throw new Error('TOSS_SECRET_KEY is Empty');
    }
    return secretKey;
  };
  getClientId = (): string => {
    const clientId = process.env.TOSS_CLIENT_ID;
    if (clientId === undefined || clientId === '') {
      throw new Error('TOSS_CLIENT_ID is Empty');
    }
    return clientId;
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
type TossPayResponse<T> = TossPaySuccess<T> | TossPayFail;
