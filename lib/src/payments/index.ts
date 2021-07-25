import axios, { AxiosResponse } from "axios";
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
import {
  NaverPayAPI,
  NaverPayApproveOnetimeParam,
  NaverPayApproveOnetimeResponse,
  NaverPayCancelPaymentParam,
  NaverPayCancelPaymentResponse,
  NaverPayGetPaymentParam,
  NaverPayGetPaymentResponse,
  NaverPayRegisterSubscriptionParam,
  NaverPayRegisterSubscriptionResponse,
} from "./naverpay/type";
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
export enum ContentType {
  APPLICATION_JSON = "application/json",
  X_WWW_FORM_URL_ENCODED_UTF8 = "application/x-www-form-urlencoded;charset=utf-8",
  X_WWW_FORM_URL_ENCODED = "application/x-www-form-urlencoded",
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
      contentType: ContentType.X_WWW_FORM_URL_ENCODED_UTF8,
    },
    [KakaoPayAPI.RegisterSubscription]: {
      method: HttpMethod.POST,
      url: "/v1/payment/ready",
      contentType: ContentType.X_WWW_FORM_URL_ENCODED_UTF8,
    },
    [KakaoPayAPI.Approve]: {
      method: HttpMethod.POST,
      url: "/v1/payment/approve",
      contentType: ContentType.X_WWW_FORM_URL_ENCODED_UTF8,
    },
    [KakaoPayAPI.InactivateSubscription]: {
      method: HttpMethod.POST,
      url: "/v1/payment/manage/subscription/inactive",
      contentType: ContentType.X_WWW_FORM_URL_ENCODED_UTF8,
    },
    [KakaoPayAPI.CancelPayment]: {
      method: HttpMethod.POST,
      url: "/v1/payment/cancel",
      contentType: ContentType.X_WWW_FORM_URL_ENCODED_UTF8,
    },
    [KakaoPayAPI.CheckSubscription]: {
      method: HttpMethod.POST,
      url: "/v1/payment/manage/subscription/status",
      contentType: ContentType.X_WWW_FORM_URL_ENCODED_UTF8,
    },
    [KakaoPayAPI.GetPayment]: {
      method: HttpMethod.POST,
      url: "/v1/payment/order",
      contentType: ContentType.X_WWW_FORM_URL_ENCODED_UTF8,
    },
    [KakaoPayAPI.ExecuteSubscription]: {
      method: HttpMethod.POST,
      url: "/v1/payment/subscription",
      contentType: ContentType.X_WWW_FORM_URL_ENCODED_UTF8,
    },
  },
  [Payment.NAVERPAY]: {
    [NaverPayAPI.ApproveOnetime]: {
      method: HttpMethod.POST,
      url: "/naverpay/payments/v2.2/apply/payment",
      contentType: ContentType.X_WWW_FORM_URL_ENCODED_UTF8,
    },
    [NaverPayAPI.GetPayment]: {
      method: HttpMethod.POST,
      url: "/naverpay/payments/v2.2/list/history",
      contentType: ContentType.APPLICATION_JSON,
    },
    [NaverPayAPI.CancelPayment]: {
      method: HttpMethod.POST,
      url: "/naverpay/payments/v1/cancel",
      contentType: ContentType.X_WWW_FORM_URL_ENCODED_UTF8,
    },
    [NaverPayAPI.RegisterSubscription]: {
      method: HttpMethod.POST,
      url: "/naverpay/payments/recurrent/regist/v1/reserve",
      contentType: ContentType.X_WWW_FORM_URL_ENCODED_UTF8,
    },
    [NaverPayAPI.InactivateSubscription]: {
      method: HttpMethod.POST,
      url: "/naverpay/payments/recurrent/expire/v1/request",
      contentType: ContentType.X_WWW_FORM_URL_ENCODED_UTF8,
    },
    [NaverPayAPI.CheckSubscription]: {
      method: HttpMethod.POST,
      url: "/naverpay/payments/recurrent/v1/list",
      contentType: ContentType.X_WWW_FORM_URL_ENCODED_UTF8,
    },
    [NaverPayAPI.ReserveSubscription]: {
      method: HttpMethod.POST,
      url: "/naverpay/payments/recurrent/pay/v3/reserve",
      contentType: ContentType.X_WWW_FORM_URL_ENCODED_UTF8,
    },
  },
};
export function doRequest(params: {
  baseUrl: string;
  requestParams: any;
  headers?: {
    [key: string]: string;
  };
  api: {
    method: HttpMethod;
    url: string;
    contentType: ContentType;
  };
}): Promise<AxiosResponse<any>> {
  const { baseUrl, requestParams, headers, api } = params;
  const requestUrl = `${baseUrl}${api.url}`;
  const timeout = 60 * 1000; // 네이버페이 권고사항에 따라 60초로 설정

  if (api.method === HttpMethod.POST) {
    if (
      [
        ContentType.X_WWW_FORM_URL_ENCODED,
        ContentType.X_WWW_FORM_URL_ENCODED_UTF8,
      ].includes(api.contentType)
    ) {
      const body = convertUrlEncodedParam(requestParams);
      return axios.post(requestUrl, body, {
        headers: {
          ...headers,
          "Content-Type": ContentType.X_WWW_FORM_URL_ENCODED_UTF8,
        },
        timeout,
      });
    }
    if (ContentType.APPLICATION_JSON === api.contentType) {
      return axios.post(requestUrl, requestParams, {
        headers: {
          ...headers,
          "Content-Type": ContentType.APPLICATION_JSON,
        },
        timeout,
      });
    }
  }
  if (api.method === HttpMethod.GET) {
    return axios.get(requestUrl, {
      headers,
      params: requestParams,
    });
  }
  die("Unsupported Request Type");
}
export type PaymentAPISignature = {
  [Payment.KAKAOPAY]: {
    [KakaoPayAPI.Ready]: [KakaoPayReadyParam, KakaoPayReadyResponse];
    [KakaoPayAPI.RegisterSubscription]: [
      KakaoPayRegisterSubscriptionParam,
      KakaoPayRegisterSubscriptionResponse
    ];
    [KakaoPayAPI.Approve]: [KakaoPayApproveParam, KakaoPayApproveResponse];
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
    [NaverPayAPI.ApproveOnetime]: [
      NaverPayApproveOnetimeParam,
      NaverPayApproveOnetimeResponse
    ];
    [NaverPayAPI.GetPayment]: [
      NaverPayGetPaymentParam,
      NaverPayGetPaymentResponse
    ];
    [NaverPayAPI.CancelPayment]: [
      NaverPayCancelPaymentParam,
      NaverPayCancelPaymentResponse
    ];
    // https://developer.pay.naver.com/docs/v2/api#etc-etc_recurrent_reserve
    [NaverPayAPI.RegisterSubscription]: [
      NaverPayRegisterSubscriptionParam,
      NaverPayRegisterSubscriptionResponse
    ];
    [NaverPayAPI.InactivateSubscription]: [{}, {}];
    [NaverPayAPI.CheckSubscription]: [{}, {}];
    [NaverPayAPI.ReserveSubscription]: [{}, {}];
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
