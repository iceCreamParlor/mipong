import axios, { AxiosResponse } from "axios";
import { KakaoPay, KakaoPaySecret } from "./kakaopay";
import { KakaoPayAPI } from "./kakaopay/type";
import { NaverPay, NaverPaySecret } from "./naverpay";
import { NaverPayAPI } from "./naverpay/type";
import { NicePay, NicePaySecret } from "./nicepay";
import { NicePayAPI } from "./nicepay/type";
import { TossPayments, TossPaymentsSecret } from "./toss-payments";
import { TossPaymentsAPI } from "./toss-payments/type";
import { TossPay, TossPaySecret } from "./tosspay";
import { TossPayAPI } from "./tosspay/type";
import {
  ApproveOnetimeFailResponse,
  ApproveOnetimeParam,
  ApproveOnetimeResponse,
  ApproveSubscriptionFailResponse,
  ApproveSubscriptionParam,
  ApproveSubscriptionResponse,
  CancelPaymentFailResponse,
  CancelPaymentParam,
  CancelPaymentResponse,
  CheckSubscriptionFailResponse,
  CheckSubscriptionParam as CheckSubscriptionParam,
  CheckSubscriptionResponse,
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

export class Mipong {
  public static DEFAULT_RETRY_TIME = 3;
  public static DEFAULT_RETRY_INTERVAL = 100;
  // public static getIamport() {
  //   return die("아임포트는 지원하지 않습니다.");
  // }
  public static getKakaoPay(params?: KakaoPaySecret) {
    return KakaoPay.getInstance(params);
  }
  public static getNaverPay(params?: NaverPaySecret) {
    return NaverPay.getInstance(params);
  }
  public static getTossPayments(params?: TossPaymentsSecret) {
    return TossPayments.getInstance(params);
  }
  public static getTossPay(params?: TossPaySecret) {
    return TossPay.getInstance(params);
  }
  public static getNicePay(params?: NicePaySecret) {
    return NicePay.getInstance(params);
  }
  public static setRetryTime(value: number) {
    this.DEFAULT_RETRY_TIME = value;
  }
  public static setRetryInterval(value: number) {
    this.DEFAULT_RETRY_INTERVAL = value;
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
export type InactivablePayment =
  | Payment.KAKAOPAY
  | Payment.NAVERPAY
  | Payment.TOSSPAY;

export type SubscriptionCheckablePayment =
  | Payment.KAKAOPAY
  | Payment.NAVERPAY
  | Payment.TOSSPAY;
export enum HttpMethod {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
}
export enum ContentType {
  APPLICATION_JSON = "application/json",
  X_WWW_FORM_URL_ENCODED = "application/x-www-form-urlencoded",
  X_WWW_FORM_URL_ENCODED_UTF8 = "application/x-www-form-urlencoded;charset=utf-8",
  X_WWW_FORM_URL_ENCODED_EUC_KR = "application/x-www-form-urlencoded; charset=euc-kr",
  NULL = "",
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
    [KakaoPayAPI.ApproveSubscription]: {
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
    [NaverPayAPI.PrepareRegisterSubscription]: {
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
      contentType: ContentType.APPLICATION_JSON,
    },
    [NaverPayAPI.ReserveSubscription]: {
      method: HttpMethod.POST,
      url: "/naverpay/payments/recurrent/pay/v3/reserve",
      contentType: ContentType.X_WWW_FORM_URL_ENCODED_UTF8,
    },
    [NaverPayAPI.RegisterSubscription]: {
      method: HttpMethod.POST,
      url: "/naverpay/payments/recurrent/regist/v1/approval",
      contentType: ContentType.X_WWW_FORM_URL_ENCODED_UTF8,
    },
    [NaverPayAPI.ApproveSubscription]: {
      method: HttpMethod.POST,
      url: "/naverpay/payments/recurrent/pay/v3/approval",
      contentType: ContentType.X_WWW_FORM_URL_ENCODED_UTF8,
    },
    [NaverPayAPI.ReserveSubscription]: {
      method: HttpMethod.POST,
      url: "/naverpay/payments/recurrent/pay/v3/reserve",
      contentType: ContentType.X_WWW_FORM_URL_ENCODED_UTF8,
    },
  },
  [Payment.TOSSPAY]: {
    [TossPayAPI.Ready]: {
      method: HttpMethod.POST,
      url: "/api/v2/payments",
      contentType: ContentType.APPLICATION_JSON,
    },
    [TossPayAPI.ApproveOnetime]: {
      method: HttpMethod.POST,
      url: "/api/v2/execute",
      contentType: ContentType.APPLICATION_JSON,
    },
    [TossPayAPI.GetPayment]: {
      method: HttpMethod.POST,
      url: "/api/v2/status",
      contentType: ContentType.APPLICATION_JSON,
    },
    [TossPayAPI.CancelPayment]: {
      method: HttpMethod.POST,
      url: "/api/v2/refunds",
      contentType: ContentType.APPLICATION_JSON,
    },
    [TossPayAPI.RegisterSubscription]: {
      method: HttpMethod.POST,
      url: "/api/v1/billing-key",
      contentType: ContentType.APPLICATION_JSON,
    },
    [TossPayAPI.ApproveSubscription]: {
      method: HttpMethod.POST,
      url: "/api/v1/billing-key/bill",
      contentType: ContentType.APPLICATION_JSON,
    },
    [TossPayAPI.CheckSubscription]: {
      method: HttpMethod.POST,
      url: "/api/v1/billing-key/status",
      contentType: ContentType.APPLICATION_JSON,
    },
    [TossPayAPI.InactivateSubscription]: {
      method: HttpMethod.POST,
      url: "/api/v1/billing-key/remove",
      contentType: ContentType.APPLICATION_JSON,
    },
  },
  [Payment.TOSS_PAYMENTS]: {
    [TossPaymentsAPI.ApproveOnetime]: {
      method: HttpMethod.POST,
      url: "/v1/payments/#{paymentKey}",
      contentType: ContentType.APPLICATION_JSON,
    },
    [TossPaymentsAPI.CancelPayment]: {
      method: HttpMethod.POST,
      url: "/v1/payments/#{paymentKey}/cancel",
      contentType: ContentType.APPLICATION_JSON,
    },
    [TossPaymentsAPI.GetPayment]: {
      method: HttpMethod.GET,
      url: "/v1/payments/orders/#{paymentKey}",
      contentType: ContentType.NULL,
    },
    [TossPaymentsAPI.RegisterSubscription]: {
      method: HttpMethod.POST,
      url: "/v1/billing/authorizations/#{authKey}",
      contentType: ContentType.APPLICATION_JSON,
    },
    [TossPaymentsAPI.ApproveSubscription]: {
      method: HttpMethod.POST,
      url: "/v1/billing/#{billingKey}",
      contentType: ContentType.APPLICATION_JSON,
    },
  },
  [Payment.NICEPAY]: {
    [NicePayAPI.RegisterSubscription]: {
      method: HttpMethod.POST,
      url: "/billing/billing_regist.jsp",
      contentType: ContentType.X_WWW_FORM_URL_ENCODED_EUC_KR,
    },
    [NicePayAPI.ApproveSubscription]: {
      method: HttpMethod.POST,
      url: "/billing/billing_approve.jsp",
      contentType: ContentType.X_WWW_FORM_URL_ENCODED_EUC_KR,
    },
    [NicePayAPI.CancelPayment]: {
      method: HttpMethod.POST,
      url: "/cancel_process.jsp",
      contentType: ContentType.X_WWW_FORM_URL_ENCODED_EUC_KR,
    },
    [NicePayAPI.InactivateSubscription]: {
      method: HttpMethod.POST,
      url: "billing/billkey_remove.jsp",
      contentType: ContentType.X_WWW_FORM_URL_ENCODED_EUC_KR,
    },
  },
};

export abstract class PaymentLib<T extends Payment> {
  constructor() {}
  abstract withPaymentResponse(
    fn: () => Promise<AxiosResponse<any>>,
    api?: any
  ): Promise<any>;

  /*! 일반결제 승인 */
  abstract approveOnetime(
    params: ApproveOnetimeParam[T]
  ): Promise<
    PaymentResponse<ApproveOnetimeResponse[T], ApproveOnetimeFailResponse[T]>
  >;

  /*! 정기결제 등록 */
  abstract registerSubscription(
    params: RegisterSubscriptionParam[T]
  ): Promise<
    PaymentResponse<
      RegisterSubscriptionResponse[T],
      RegisterSubscriptionFailResponse[T]
    >
  >;

  /*! 정기결제 실행 */
  abstract approveSubscription(
    params: ApproveSubscriptionParam[T]
  ): Promise<
    PaymentResponse<
      ApproveSubscriptionResponse[T],
      ApproveSubscriptionFailResponse[T]
    >
  >;

  /*! 결제 취소 */
  abstract cancelPayment(
    params: CancelPaymentParam[T],
    type?: "onetime" | "subscription"
  ): Promise<
    PaymentResponse<CancelPaymentResponse[T], CancelPaymentFailResponse[T]>
  >;

  /*! 결제 조회 */
  abstract getPayment(
    params: GetPaymentParam[T],
    type?: "onetime" | "subscription"
  ): Promise<PaymentResponse<GetPaymentResponse[T], GetPaymentFailResponse[T]>>;
}
export abstract class Inactivable<T extends InactivablePayment> {
  /*! 정기결제키 비활성화 */
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
  /*! 정기결제키 상태체크 */
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
/**
 * 문자열을 Base64 로 인코딩
 * @param str
 */
export function convert2Base64(str: string): string {
  return Buffer.from(str).toString("base64");
}
export function convertUrlEncodedParam(param: object): URLSearchParams {
  const params = new URLSearchParams();
  Object.keys(param).forEach((p) => {
    params.append(p, (param as any)[p]);
  });
  return params;
}
export function omit(obj: { [k: string]: any }, omitList: string[]) {
  const result: any = {};
  Object.keys(obj).forEach((k) => {
    omitList.forEach((key) => {
      if (k !== key) {
        result[k] = obj[k];
      }
    });
  });
  return result;
}
export function filterTruthy(obj: { [k: string]: any }) {
  const result: any = {};
  Object.keys(obj).forEach((k) => {
    if (!!k) {
      result[k] = obj[k];
    }
  });
  return result;
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
  option?: { [key: string]: string };
  replace?: { [key: string]: string };
}): Promise<AxiosResponse<any>> {
  const { baseUrl, requestParams, headers, api, replace, option } = params;
  let requestUrl = `${baseUrl}${api.url}`;
  if (replace) {
    Object.keys(replace).forEach(
      (key) => (requestUrl = requestUrl.replace(`#{${key}}`, replace[key]))
    );
  }
  /*! 네이버페이 권고사항에 따라 60초로 설정 */
  const timeout = 60 * 1000;

  if (api.method === HttpMethod.POST) {
    if (api.contentType.includes(ContentType.X_WWW_FORM_URL_ENCODED)) {
      const body = convertUrlEncodedParam(requestParams);
      return axios.post(requestUrl, body, {
        headers: {
          ...headers,
          "Content-Type": ContentType.X_WWW_FORM_URL_ENCODED_UTF8,
        },
        timeout,
        ...(option ?? {}),
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
