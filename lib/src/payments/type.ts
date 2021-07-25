import { Payment } from ".";
import { IamportApproveOnetimeParam } from "./iamport/type";
import {
  KakaoPayApproveParam,
  KakaoPayApproveResponse,
  KakaoPayCancelParam,
  KakaoPayCancelResponse,
  KakaoPayCheckSubscriptionParam,
  KakaoPayCheckSubscriptionResponse,
  KakaoPayExecuteSubscriptionParam,
  KakaoPayExecuteSubscriptionResponse,
  KakaoPayFailResponse,
  KakaoPayGetPaymentParam,
  KakaoPayGetPaymentResponse,
  KakaoPayInactivateSubscriptionParam,
  KakaoPayInactivateSubscriptionResponse,
  KakaoPayReadyParam,
  KakaoPayReadyResponse,
  KakaoPayRegisterSubscriptionParam,
  KakaoPayRegisterSubscriptionResponse,
} from "./kakaopay/type";
import {
  NaverPayApproveOnetimeParam,
  NaverPayCheckSubscriptionParam as NaverPayCheckSubscriptionParam,
  NaverPayCheckSubscriptionResponse as NaverPayCheckSubscriptionResponse,
  NaverPayFailResponse,
  NaverPayInactivateSubscriptionResponse as NaverPayInactivateSubscriptionResponse,
  NaverPayInactivateSubscriptionParam as NaverPayInactivateSubscriptionParam,
  NaverPayApproveOnetimeResponse,
  NaverPayCancelPaymentResponse,
  NaverPayCancelPaymentParam,
  NaverPayGetPaymentResponse,
  NaverPayGetPaymentParam,
  NaverPayRegisterSubscriptionParam,
  NaverPayRegisterSubscriptionResponse,
} from "./naverpay/type";
import { NicePayApproveOnetimeParam } from "./nicepay/type";
import { TossPaymentsApproveOnetimeParam } from "./toss-payments/type";
import {
  TossPayApproveOnetimeParam,
  TossPayBillingKeyCheckParam as TossPayCheckSubscriptionParam,
  TossPayBillingKeyCheckResponse as TossPayCheckSubscriptionResponse,
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
  [Payment.NAVERPAY]: NaverPayApproveOnetimeResponse;
  [Payment.TOSSPAY]: {};
};
export type ApproveOnetimeFailResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: KakaoPayFailResponse;
  [Payment.NAVERPAY]: NaverPayFailResponse;
  [Payment.TOSSPAY]: {};
};

export type GetPaymentParam = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: KakaoPayGetPaymentParam;
  [Payment.NAVERPAY]: NaverPayGetPaymentParam;
  [Payment.TOSSPAY]: {};
};
export type GetPaymentResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: KakaoPayGetPaymentResponse;
  [Payment.NAVERPAY]: NaverPayGetPaymentResponse;
  [Payment.TOSSPAY]: {};
};
export type GetPaymentFailResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: KakaoPayFailResponse;
  [Payment.NAVERPAY]: NaverPayFailResponse;
  [Payment.TOSSPAY]: {};
};

export type InactivateSubscriptionParam = {
  [Payment.KAKAOPAY]: KakaoPayInactivateSubscriptionParam;
  [Payment.NAVERPAY]: NaverPayInactivateSubscriptionParam;
  [Payment.TOSSPAY]: {
    billingKey: string;
  };
};
export type InactivateSubscriptionResponse = {
  [Payment.KAKAOPAY]: KakaoPayInactivateSubscriptionResponse;
  [Payment.NAVERPAY]:
    | NaverPayInactivateSubscriptionResponse
    | NaverPayFailResponse;
  [Payment.TOSSPAY]: {};
};
export type InactivateSubscriptionFailResponse = {
  [Payment.KAKAOPAY]: KakaoPayFailResponse;
  [Payment.NAVERPAY]:
    | NaverPayInactivateSubscriptionResponse
    | NaverPayFailResponse;
  [Payment.TOSSPAY]: {};
};
export type CheckSubscriptionParam = {
  [Payment.KAKAOPAY]: KakaoPayCheckSubscriptionParam;
  [Payment.NAVERPAY]: NaverPayCheckSubscriptionParam;
  [Payment.TOSSPAY]: TossPayCheckSubscriptionParam;
};
export type CheckSubscriptionResponse = {
  [Payment.KAKAOPAY]: KakaoPayCheckSubscriptionResponse;
  [Payment.NAVERPAY]: NaverPayCheckSubscriptionResponse;
  [Payment.TOSSPAY]: TossPayCheckSubscriptionResponse;
};
export type CheckSubscriptionFailResponse = {
  [Payment.KAKAOPAY]: KakaoPayFailResponse;
  [Payment.NAVERPAY]: NaverPayFailResponse;
  [Payment.TOSSPAY]: TossPayFailResponse;
};

export type RegisterSubscriptionParam = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: KakaoPayRegisterSubscriptionParam;
  [Payment.NAVERPAY]: NaverPayRegisterSubscriptionParam;
  [Payment.TOSSPAY]: {};
};
export type RegisterSubscriptionResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: KakaoPayRegisterSubscriptionResponse;
  [Payment.NAVERPAY]: NaverPayRegisterSubscriptionResponse;
  [Payment.TOSSPAY]: {};
};
export type RegisterSubscriptionFailResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: KakaoPayFailResponse;
  [Payment.NAVERPAY]: NaverPayFailResponse;
  [Payment.TOSSPAY]: {};
};
export type ExecuteSubscriptionParam = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: KakaoPayExecuteSubscriptionParam;
  [Payment.NAVERPAY]: {};
  [Payment.TOSSPAY]: {};
};
export type ExecuteSubscriptionResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: KakaoPayExecuteSubscriptionResponse;
  [Payment.NAVERPAY]: {};
  [Payment.TOSSPAY]: {};
};
export type ExecuteSubscriptionFailResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: KakaoPayFailResponse;
  [Payment.NAVERPAY]: {};
  [Payment.TOSSPAY]: {};
};
export type ExecuteFirstSubscriptionParam = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: KakaoPayReadyParam;
  [Payment.NAVERPAY]: {};
  [Payment.TOSSPAY]: {};
};

export type CancelPaymentParam = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: KakaoPayCancelParam;
  [Payment.NAVERPAY]: NaverPayCancelPaymentParam;
  [Payment.TOSSPAY]: {};
};
export type CancelPaymentResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: KakaoPayCancelResponse;
  [Payment.NAVERPAY]: NaverPayCancelPaymentResponse;
  [Payment.TOSSPAY]: {};
};
export type CancelPaymentFailResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: {};
  [Payment.KAKAOPAY]: KakaoPayFailResponse;
  [Payment.NAVERPAY]: NaverPayFailResponse;
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
