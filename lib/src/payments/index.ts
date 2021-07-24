import { AxiosResponse } from "axios";
import { Iamport } from "./iamport";
import { KakaoPay } from "./kakaopay";
import {
  KakaoPayAPI,
  KakaoPayApproveParam,
  KakaoPayApproveResponse,
  KakaoPayCancelParam,
  KakaoPayCancelResponse,
  KakaoPayCheckSubscriptionParam,
  KakaoPayCheckSubscriptionResponse,
  KakaoPayExecuteSubscriptionParam,
  KakaoPayExecuteSubscriptionResponse,
  KakaoPayInactivateSubscriptionParam,
  KakaoPayInactivateSubscriptionResponse,
  KakaoPayReadyParam,
  KakaoPayReadyResponse,
  KakaoPayRegisterSubscriptionParam,
  KakaoPayRegisterSubscriptionResponse,
} from "./kakaopay/type";
import { NaverPay } from "./naverpay";
import { NaverPayAPI } from "./naverpay/type";
import { NicePay } from "./nicepay";
import { TossPayments } from "./toss-payments";
import { TossPay } from "./tosspay";
import {
  ApproveOnetimeFailResponse,
  ApproveOnetimeParam,
  ApproveOnetimeResponse,
  CancelPaymentFailResponse,
  CancelPaymentParam,
  CancelPaymentResponse,
  CheckSubscriptionFailResponse,
  CheckSubscriptionParam as CheckSubscriptionParam,
  CheckSubscriptionResponse,
  ExecuteSubscriptionFailResponse,
  ExecuteSubscriptionParam,
  ExecuteSubscriptionResponse,
  GetPaymentFailResponse,
  GetPaymentParam,
  GetPaymentResponse,
  InactivateSubscriptionFailResponse,
  InactivateSubscriptionParam as InactivateSubscriptionParam,
  InactivateSubscriptionResponse,
  PaymentResponse,
  RegisterSubscriptionFailResponse,
  RegisterSubscriptionParam,
  RegisterSubscriptionResponse,
} from "./type";

export type PaymentType = {
  [Payment.IAMPORT]: Iamport;
  [Payment.KAKAOPAY]: KakaoPay;
  [Payment.NAVERPAY]: NaverPay;
  [Payment.NICEPAY]: NicePay;
  [Payment.TOSS_PAYMENTS]: TossPayments;
  [Payment.TOSSPAY]: TossPay;
};

export class Mipong {
  public static DEFAULT_RETRY_TIME = 3;
  public static DEFAULT_RETRY_INTERVAL = 100;
  public static getIamport() {
    return Iamport.instance;
  }
  public static getKakaoPay() {
    return KakaoPay.instance;
  }
  public static getNaverPay() {
    return NaverPay.instance;
  }
  public static getTossPayments() {
    return TossPayments.instance;
  }
  public static getTossPay() {
    return TossPay.instance;
  }
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
    [KakaoPayAPI.RegisterSubscription]: {
      method: HttpMethod.POST,
      url: "/v1/payment/ready",
    },
    [KakaoPayAPI.Approve]: {
      method: HttpMethod.POST,
      url: "/v1/payment/approve",
    },
    [KakaoPayAPI.InactivateSubscription]: {
      method: HttpMethod.POST,
      url: "/v1/payment/manage/subscription/inactive",
    },
    [KakaoPayAPI.CancelPayment]: {
      method: HttpMethod.POST,
      url: "/v1/payment/cancel",
    },
    [KakaoPayAPI.CheckSubscription]: {
      method: HttpMethod.POST,
      url: "/v1/payment/manage/subscription/status",
    },
    [KakaoPayAPI.GetPayment]: {
      method: HttpMethod.POST,
      url: "/v1/payment/order",
    },
    [KakaoPayAPI.ExecuteSubscription]: {
      method: HttpMethod.POST,
      url: "/v1/payment/subscription",
    },
  },
  [Payment.NAVERPAY]: {
    [NaverPayAPI.Approve]: {
      method: HttpMethod.POST,
      url: "/naverpay/payments/v2.2/apply/payment",
    },
    [NaverPayAPI.GetPayment]: {
      method: HttpMethod.POST,
      url: "/naverpay/payments/v2.2/list/history",
    },
  },
};
export type PaymentAPISignature = {
  [Payment.KAKAOPAY]: {
    [KakaoPayAPI.Ready]: [KakaoPayReadyParam, KakaoPayReadyResponse];
    [KakaoPayAPI.RegisterSubscription]: [
      KakaoPayRegisterSubscriptionParam,
      KakaoPayRegisterSubscriptionResponse
    ];
    [KakaoPayAPI.Approve]: [KakaoPayApproveParam, KakaoPayApproveResponse];
    // [KakaoPayAPI.ApproveSubscription]: [
    //   KakaoPayReadyParam,
    //   KakaoPayReadyResponse
    // ];
    [KakaoPayAPI.InactivateSubscription]: [
      KakaoPayInactivateSubscriptionParam,
      KakaoPayInactivateSubscriptionResponse
    ];
    [KakaoPayAPI.CancelPayment]: [KakaoPayCancelParam, KakaoPayCancelResponse];
    [KakaoPayAPI.ExecuteSubscription]: [
      KakaoPayExecuteSubscriptionParam,
      KakaoPayExecuteSubscriptionResponse
    ];
    [KakaoPayAPI.CheckSubscription]: [
      KakaoPayCheckSubscriptionParam,
      KakaoPayCheckSubscriptionResponse
    ];
    [KakaoPayAPI.GetPayment]: [any, any];
  };
  [Payment.NAVERPAY]: {
    [NaverPayAPI.Approve]: [{}, {}];
    [NaverPayAPI.GetPayment]: [{}, {}];
  };
};

export type InactivablePayment =
  | Payment.KAKAOPAY
  | Payment.NAVERPAY
  | Payment.TOSSPAY;

export type SubscriptionCheckablePayment =
  | Payment.KAKAOPAY
  | Payment.NAVERPAY
  | Payment.TOSSPAY;

export abstract class PaymentLib<T extends Payment> {
  constructor() {}
  abstract withPaymentResponse(
    fn: () => Promise<AxiosResponse<any>>
  ): Promise<any>;

  // 일반결제 승인
  abstract approveOnetime(
    params: ApproveOnetimeParam[T]
  ): Promise<
    PaymentResponse<ApproveOnetimeResponse[T], ApproveOnetimeFailResponse[T]>
  >;

  // 정기결제 등록
  abstract registerSubscription(
    params: RegisterSubscriptionParam[T]
  ): Promise<
    PaymentResponse<
      RegisterSubscriptionResponse[T],
      RegisterSubscriptionFailResponse[T]
    >
  >;

  // 정기결제 실행
  abstract executeSubscription(
    params: ExecuteSubscriptionParam[T]
  ): Promise<
    PaymentResponse<
      ExecuteSubscriptionResponse[T],
      ExecuteSubscriptionFailResponse[T]
    >
  >;

  // 결제 취소
  abstract cancelPayment(
    params: CancelPaymentParam[T],
    type?: "onetime" | "subscription"
  ): Promise<
    PaymentResponse<CancelPaymentResponse[T], CancelPaymentFailResponse[T]>
  >;

  // 결제 조회
  abstract getPayment(
    params: GetPaymentParam[T],
    type?: "onetime" | "subscription"
  ): Promise<PaymentResponse<GetPaymentResponse[T], GetPaymentFailResponse[T]>>;
}
export abstract class Inactivable<T extends InactivablePayment> {
  // 정기결제키 비활성화
  abstract inactivateSubscription(
    params: InactivateSubscriptionParam[T]
  ): Promise<
    PaymentResponse<
      InactivateSubscriptionResponse[T],
      InactivateSubscriptionFailResponse[T]
    >
  >;
}
export abstract class SubscriptionCheckable<
  T extends SubscriptionCheckablePayment
> {
  // 정기결제키 상태체크
  abstract checkSubscription(
    params: CheckSubscriptionParam[T]
  ): Promise<
    PaymentResponse<
      CheckSubscriptionResponse[T],
      CheckSubscriptionFailResponse[T]
    >
  >;
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
  times = Mipong.DEFAULT_RETRY_TIME,
  interval = Mipong.DEFAULT_RETRY_INTERVAL,
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
    } catch (error: any) {
      if (++attemptCount >= times) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}
