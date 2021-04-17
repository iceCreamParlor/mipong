import axios from 'axios';
import { URLSearchParams } from 'url';

export const legacyPayApiAxios = axios.create({
  baseURL:
    process.env.LABEL == 'prod' || process.env.USE_PROD
      ? 'https://pay-api.wiselycompany.com'
      : 'https://pay-api-dev.wiselycompany.com',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
import { AxiosResponse } from 'axios';

export interface PaymentResponse {
  success: boolean;
  statusCode: number;
  pg: PaymentType;
  data: any;
}

export type PaymentType =
  | 'iamport'
  | 'nicepayments'
  | 'naverpay'
  | 'toss'
  | 'tosspay'
  | 'kakaopay';

export async function withPaymentResponse(
  paymentType: PaymentType,
  fn: () => Promise<AxiosResponse<any>>,
): Promise<any> {
  try {
    const result = await fn();

    let success: boolean = false;
    if (['toss', 'kakaopay'].includes(paymentType)) {
      success = result.status === 200;
    } else if (paymentType === 'tosspay') {
      // 0 : 성공 / -1 : 실패
      success = (result as any).code === 0;
    } else {
      success = result.status === 200;
    }

    return {
      success,
      statusCode: result.status,
      pg: paymentType,
      data: result.data,
    };
  } catch (err) {
    if (err.isAxiosError) {
      return {
        success: false,
        statusCode: err.response.status,
        pg: paymentType,
        data: err.response.data,
      };
    } else {
      throw err;
    }
  }
}

export enum SubscriptionPayNowEnum {
  SUCCESS = 'success',
  PAYMENT_FAIL = 'paymentFail',
}
