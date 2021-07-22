import { AxiosResponse } from "axios";
import KakaoPayService from "../payments-mono/kakaopay";
import { Iamport } from "./iamport";
import { KakaoPay } from "./kakaopay";
import { KakaoPayAPI, KakaoPayReadyParam, KakaoPayReadyResponse } from "./kakaopay/type";
import { NaverPay } from "./naverpay";
import { NicePay } from "./nicepay";
import { TossPayments } from "./toss-payments";
import { TossPay } from "./tosspay";
import {
  ,
  ApproveOnetimeParam,
  ApproveOnetimeResponse,
  BillingKeyCheckParam,
  CancelPaymentParam,
  CancelPaymentResponse,
  ExecuteFirstSubscriptionParam,
  ExecuteSubscriptionParam,
  ExecuteSubscriptionResponse,
  GetPaymentParam,
  GetPaymentResponse,
  InactivateBillingKeyParam,
  RegisterSubscriptionParam,
  RegisterSubscriptionResponse,
  PaymentResponse,
  ApproveOnetimeFailResponse,
} from "./type";

export const DEFAULT_RETRY_TIME = 5;
export const DEFAULT_RETRY_INTERVAL = 10;

export function getPayment(payment: Payment) {
  if (payment === Payment.IAMPORT) {
    return Iamport.instance;
  }
  if (payment === Payment.KAKAOPAY) {
    return KakaoPay.instance;
  }
  if (payment === Payment.NAVERPAY) {
    return NaverPay.instance;
  }
  if (payment === Payment.NICEPAY) {
    return NicePay.instance;
  }
  if (payment === Payment.TOSS_PAYMENTS) {
    return TossPayments.instance;
  }
  if (payment === Payment.TOSSPAY) {
    return TossPay.instance;
  }
  die("invalid Payment");
}

export enum Payment {
  KAKAOPAY,
  NAVERPAY,
  NICEPAY,
  TOSS_PAYMENTS,
  TOSSPAY,
  IAMPORT,
}
export enum HttpMethod {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
}
export interface API {
  method: HttpMethod;
  url: string;
}

export const PaymentAPI = {
  [Payment.KAKAOPAY]: {
    [KakaoPayAPI.Ready]: {
      method: HttpMethod.POST,
      url: "/v1/payment/ready",
    },
    [KakaoPayAPI.Approve]: {
      method: HttpMethod.POST,
      url: "/v1/payment/approve",
    },
    [KakaoPayAPI.ApproveSubscription]: {
      method: HttpMethod.POST,
      url: "/v1/payment/approve",
    },
    [KakaoPayAPI.InactivateSubscription]: {
      method: HttpMethod.POST,
      url: "/v1/payment/manage/subscription/inactive",
    },
    [KakaoPayAPI.Cancel]: {
      method: HttpMethod.POST,
      url: "/v1/payment/cancel",
    },
    [KakaoPayAPI.CheckBillingKey]: {
      method: HttpMethod.POST,
      url: "/v1/payment/manage/subscription/status",
    },
    [KakaoPayAPI.GetPayment]: {
      method: HttpMethod.POST,
      url: "/v1/payment/order",
    },
  },
};
export type PaymentAPISignature = {
  [Payment.KAKAOPAY]: {
    [KakaoPayAPI.Ready]: [
      KakaoPayReadyParam,
      KakaoPayReadyResponse
    ];
    [KakaoPayAPI.Approve]: [
      KakaoPayReadyParam,
      KakaoPayReadyResponse]
    [KakaoPayAPI.ApproveSubscription]: [
      KakaoPayReadyParam,
      KakaoPayReadyResponse,
    ];
    [KakaoPayAPI.InactivateSubscription]: [
      KakaoPayReadyParam,
      KakaoPayReadyResponse
    ];
    [KakaoPayAPI.Cancel]: [
      KakaoPayReadyParam,
      KakaoPayReadyResponse
    ];
    [KakaoPayAPI.CheckBillingKey]: [
      KakaoPayReadyParam,
      KakaoPayReadyResponse,
    ];
    [KakaoPayAPI.GetPayment]: [any, any]
  };
};

export type InactivablePayment =
  | Payment.KAKAOPAY
  | Payment.NAVERPAY
  | Payment.TOSSPAY;

export type BillingKeyCheckablePayment =
  | Payment.KAKAOPAY
  | Payment.NAVERPAY
  | Payment.TOSSPAY;

export abstract class PaymentLib<T extends Payment> {
  abstract callAPI(
    api: any,
    params: any,
    type?: "onetime" | "subscription"
  ): Promise<any>;

  abstract withPaymentResponse(
    fn: () => Promise<AxiosResponse<any>>
  ): Promise<any>;

  // 일반결제 승인
  abstract approveOnetime(
    input: ApproveOnetimeParam[T]
  ): Promise<
    PaymentResponse<ApproveOnetimeResponse[T], ApproveOnetimeFailResponse[T]>
  >;

  // 정기결제 등록
  abstract registerSubscription(
    input: RegisterSubscriptionParam[T]
  ): Promise<RegisterSubscriptionResponse[T]>;

  // 정기결제 실행
  abstract executeSubscription(
    input: ExecuteSubscriptionParam[T]
  ): Promise<ExecuteSubscriptionResponse>;

  // 첫정기결제 실행
  abstract executeFirstSubscription(
    input: ExecuteFirstSubscriptionParam[T]
  ): Promise<ExecuteSubscriptionResponse[T]>;

  // 결제 취소
  abstract cancelPayment(
    input: CancelPaymentParam[T]
  ): Promise<CancelPaymentResponse[T]>;

  // 결제 조회
  abstract getPayment(
    input: GetPaymentParam[T]
  ): Promise<GetPaymentResponse[T]>;
}
export abstract class Inactivable<T extends InactivablePayment> {
  // 정기결제키 비활성화
  abstract inactivateBillingKey(
    param: InactivateBillingKeyParam[T]
  ): Promise<boolean>;
}
export abstract class BillingKeyCheckable<
  T extends BillingKeyCheckablePayment
> {
  // 정기결제키 상태체크
  abstract checkBillingKeyStatus(
    param: BillingKeyCheckParam[T]
  ): Promise<boolean>;
}

export function die(msg: string): never {
  throw new Error(msg);
}
export function getSecret(): any {
  return process.env;
}
export function convertUrlEncodedParam(param: object): URLSearchParams {
  const params = new URLSearchParams();
  Object.keys(param).forEach((p) => {
    params.append(p, (param as any)[p]);
  });
  return params;
}
export function handleError(err: Error) {
  console.error(err.message);
  return die(err.message);
}
export async function retry<T>({
  fn,
  times = DEFAULT_RETRY_TIME,
  interval = DEFAULT_RETRY_INTERVAL,
}: {
  fn: (...args: any[]) => T;
  times?: number;
  interval?: number;
}): Promise<T> {
  if (times < 1) {
    throw new Error("times 는 1보다 커야 함");
  }
  let attemptCount = 0;
  while (true) {
    try {
      const result = await fn();
      return result;
    } catch (error) {
      if (++attemptCount >= times) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}
