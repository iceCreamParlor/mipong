import { Payment } from ".";
import { IamportApproveOnetimeParam } from "./iamport/type";
import {
  KakaoPayApproveParam,
  KakaoPayApproveResponse,
  KakaoPayBillingKeyCheckParam,
  KakaoPayBillingKeyCheckResponse,
  KakaoPayFailResponse,
  KakaoPayGetPaymentParam,
  KakaoPayGetPaymentResponse,
  KakaoPayInactivateBillingKeyParam,
  KakaoPayInactivateBillingKeyResponse,
} from "./kakaopay/type";
import {
  NaverPayApproveOnetimeParam,
  NaverPayBillingKeyCheckParam,
  NaverPayBillingKeyCheckResponse,
  NaverPayFailResponse,
  NaverPayInactivateBiilingKeyResponse,
  NaverPayInactivateBillingKeyParam,
} from "./naverpay/type";
import { NicePayApproveOnetimeParam } from "./nicepay/type";
import { TossPaymentsApproveOnetimeParam } from "./toss-payments/type";
import {
  TossPayApproveOnetimeParam,
  TossPayBillingKeyCheckParam,
  TossPayBillingKeyCheckResponse,
  TossPayFailResponse,
} from "./tosspay/type";

export type ApproveOnetimeParam = {
  [Payment.IAMPORT]: IamportApproveOnetimeParam;
  [Payment.NICEPAY]: NicePayApproveOnetimeParam;
  [Payment.TOSS_PAYMENTS]: TossPaymentsApproveOnetimeParam;
  [Payment.KAKAOPAY]: KakaoPayApproveParam;
  [Payment.NAVERPAY]: NaverPayApproveOnetimeParam;
  [Payment.TOSSPAY]: TossPayApproveOnetimeParam;
};
export type ApproveOnetimeResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: KakaoPayApproveResponse;
  [Payment.NAVERPAY]: {};
  [Payment.TOSSPAY]: {};
};
export type ApproveOnetimeFailResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: KakaoPayFailResponse;
  [Payment.NAVERPAY]: {};
  [Payment.TOSSPAY]: {};
};

export type GetPaymentParam = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: KakaoPayGetPaymentParam;
  [Payment.NAVERPAY]: {};
  [Payment.TOSSPAY]: {};
};
export type GetPaymentResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: KakaoPayGetPaymentResponse | KakaoPayFailResponse;
  [Payment.NAVERPAY]: {} | NaverPayFailResponse;
  [Payment.TOSSPAY]: {};
};

export type InactivateBillingKeyParam = {
  [Payment.KAKAOPAY]: KakaoPayInactivateBillingKeyParam;
  [Payment.NAVERPAY]: NaverPayInactivateBillingKeyParam;
  [Payment.TOSSPAY]: {
    billingKey: string;
  };
};
export type InactivateBillingKeyResponse = {
  [Payment.KAKAOPAY]:
    | KakaoPayInactivateBillingKeyResponse
    | KakaoPayFailResponse;
  [Payment.NAVERPAY]:
    | NaverPayInactivateBiilingKeyResponse
    | NaverPayFailResponse;
  [Payment.TOSSPAY]: {};
};
export type BillingKeyCheckParam = {
  [Payment.KAKAOPAY]: KakaoPayBillingKeyCheckParam;
  [Payment.NAVERPAY]: NaverPayBillingKeyCheckParam;
  [Payment.TOSSPAY]: TossPayBillingKeyCheckParam;
};
export type BillingKeyCheckResponse = {
  [Payment.KAKAOPAY]: KakaoPayBillingKeyCheckResponse | KakaoPayFailResponse;
  [Payment.NAVERPAY]: NaverPayBillingKeyCheckResponse | NaverPayFailResponse;
  [Payment.TOSSPAY]: TossPayBillingKeyCheckResponse | TossPayFailResponse;
};

export type RegisterSubscriptionParam = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: {};
  [Payment.NAVERPAY]: {};
  [Payment.TOSSPAY]: {};
};
export type RegisterSubscriptionResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: {};
  [Payment.NAVERPAY]: {};
  [Payment.TOSSPAY]: {};
};
export type ExecuteSubscriptionParam = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: {};
  [Payment.NAVERPAY]: {};
  [Payment.TOSSPAY]: {};
};
export type ExecuteSubscriptionResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: {};
  [Payment.NAVERPAY]: {};
  [Payment.TOSSPAY]: {};
};
export type ExecuteFirstSubscriptionParam = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: {};
  [Payment.NAVERPAY]: {};
  [Payment.TOSSPAY]: {};
};

export type CancelPaymentParam = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: {};
  [Payment.NAVERPAY]: {};
  [Payment.TOSSPAY]: {};
};
export type CancelPaymentResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: {};
  [Payment.NAVERPAY]: {};
  [Payment.TOSSPAY]: {};
};
export interface SuccessResponse<T> {
  success: true;
  statusCode: number;
  data: T;
}
export interface FailResponse<T> {
  success: false;
  statusCode: number;
  data: T;
}
export type PaymentResponse<SUCCESS_TYPE, FAIL_TYPE> =
  | SuccessResponse<SUCCESS_TYPE>
  | FailResponse<FAIL_TYPE>;
