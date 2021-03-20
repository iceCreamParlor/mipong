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
  | 'tosspay';

export async function withPaymentResponse(
  paymentType: PaymentType,
  fn: () => Promise<AxiosResponse<any>>,
): Promise<any> {
  let result: any;
  let success: boolean = false;
  let statusCode: number = 500;
  let data: any;
  try {
    result = await fn();

    if (paymentType === 'toss') {
      success = result.status === 200;
    } else {
      success = result.status === 200;
    }

    statusCode = result.status;
    data = result.data;
  } catch (err) {
    if (err.isAxiosError) {
      success = false;
      statusCode = err.response.status;
      data = err.response.data;
    } else {
      throw err;
    }
  } finally {
    return {
      success,
      statusCode,
      pg: paymentType,
      data,
    };
  }
}
