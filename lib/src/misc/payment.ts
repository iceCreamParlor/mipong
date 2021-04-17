import axios from "axios";
import { URLSearchParams } from "url";
import { AxiosResponse } from "axios";

export abstract class PaymentSerivce {
  abstract readyPayment?(param: PaymentParam): Promise<PaymentResponse>;
  // 일반결제 승인
  abstract approveOnetime(param: PaymentParam): Promise<PaymentResponse>;
  // 환불
  abstract cancelPayment(param: PaymentParam): Promise<PaymentResponse>;
  // 거래내역 조회
  abstract getPayment(param: PaymentParam): Promise<PaymentResponse>;
  // 정기결제 등록
  abstract registerSubscription?(param: PaymentParam): Promise<PaymentResponse>;
  // 정기결제
  abstract approveSubscription?(param: PaymentParam): Promise<PaymentResponse>;
  // 정기결제 해지
  abstract inactivateSubscription?(
    param: PaymentParam
  ): Promise<PaymentResponse>;
}

export interface PaymentParam {}

export interface PaymentResponse {
  success: boolean;
  statusCode: number;
  pg: PaymentType;
  data: any;
}

export type PaymentType =
  | "iamport"
  | "nicepayments"
  | "naverpay"
  | "toss"
  | "tosspay"
  | "kakaopay";

export async function withPaymentResponse(
  paymentType: PaymentType,
  fn: () => Promise<AxiosResponse<any>>
): Promise<any> {
  try {
    const result = await fn();

    let success: boolean = false;
    if (["toss", "kakaopay"].includes(paymentType)) {
      success = result.status === 200;
    } else if (paymentType === "tosspay") {
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
export interface PaymentSecret {
  readonly kakaopay: {
    readonly adminKey?: string;
    readonly onetimeCid?: string;
    readonly subscriptionCid?: string;
  };
  readonly tosspay: {
    readonly apiKey?: string;
  };
  readonly toss: {
    readonly clientId?: string;
    readonly secretKey?: string;
  };
}

export function getSecret(): PaymentSecret {
  const source = process.env;
  return {
    kakaopay: {
      adminKey: source.KAKAOPAY_ADMIN_KEY,
      onetimeCid: source.KAKAOPAY_ONETIME_CID,
      subscriptionCid: source.KAKAOPAY_SUBSCRIPTION_CID,
    },
    tosspay: {
      apiKey: source.TOSS_PAY_API_KEY,
    },
    toss: {
      clientId: source.TOSS_CLIENT_ID,
      secretKey: source.TOSS_SECRET_KEY,
    },
  };
}

export enum SubscriptionPayNowEnum {
  SUCCESS = "success",
  PAYMENT_FAIL = "paymentFail",
}
