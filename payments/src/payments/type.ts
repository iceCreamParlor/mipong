import { Payment } from ".";
import { Iamport } from "./iamport";
import { IamportApproveOnetimeParam } from "./iamport/type";
import { KakaoPay } from "./kakaopay";
import {
  KakaoPayAPI,
  KakaoPayApproveParam,
  KakaoPayApproveResponse,
  KakaoPayApproveSubscriptionParam,
  KakaoPayApproveSubscriptionResponse,
  KakaoPayCancelParam,
  KakaoPayCancelResponse,
  KakaoPayCheckSubscriptionParam,
  KakaoPayCheckSubscriptionResponse,
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
import { NaverPay } from "./naverpay";
import {
  NaverPayAPI,
  NaverPayApproveOnetimeParam,
  NaverPayApproveOnetimeResponse,
  NaverPayApproveSubscriptionParam,
  NaverPayApproveSubscriptionResponse,
  NaverPayCancelPaymentParam,
  NaverPayCancelPaymentResponse,
  NaverPayCheckSubscriptionParam,
  NaverPayCheckSubscriptionResponse,
  NaverPayFailResponse,
  NaverPayGetPaymentParam,
  NaverPayGetPaymentResponse,
  NaverPayInactivateSubscriptionParam,
  NaverPayInactivateSubscriptionResponse,
  NaverPayPrepareRegisterSubscriptionParam,
  NaverPayPrepareRegisterSubscriptionResponse,
  NaverPayRegisterSubscriptionParam,
  NaverPayRegisterSubscriptionResponse,
  NaverPayReserveSubscriptionParam,
  NaverPayReserveSubscriptionResponse,
} from "./naverpay/type";
import { NicePay } from "./nicepay";
import {
  NicePayAPI,
  NicePayApproveSubscriptionParam,
  NicePayApproveSubscriptionResponse,
  NicePayCancelPaymentParam,
  NicePayCancelPaymentResponse,
  NicePayInactivateSubscriptionParam,
  NicePayInactivateSubscriptionResponse,
  NicePayRegisterSubscriptionParam,
  NicePayRegisterSubscriptionResponse,
  NicePayResponse,
} from "./nicepay/type";
import { TossPayments } from "./toss-payments";
import {
  TossPaymentsAPI,
  TossPaymentsApproveParam,
  TossPaymentsApproveResponse,
  TossPaymentsApproveSubscriptionParam,
  TossPaymentsApproveSubscriptionResponse,
  TossPaymentsCancelPaymentParam,
  TossPaymentsCancelPaymentResponse,
  TossPaymentsFailResponse,
  TossPaymentsGetPaymentParam,
  TossPaymentsGetPaymentResponse,
  TossPaymentsRegisterSubscriptionParam,
  TossPaymentsRegisterSubscriptionResponse,
} from "./toss-payments/type";
import { TossPay } from "./tosspay";
import {
  TossPayAPI,
  TossPayApproveOnetimeParam,
  TossPayApproveOnetimeResponse,
  TossPayApproveSubscriptionParam,
  TossPayApproveSubscriptionResponse,
  TossPayCancelParam,
  TossPayCancelResponse,
  TossPayCheckSubscriptionParam,
  TossPayCheckSubscriptionResponse,
  TossPayFailResponse,
  TossPayGetPaymentParam,
  TossPayGetPaymentResponse,
  TossPayInactivateSubscriptionParam,
  TossPayInactivateSubscriptionResponse,
  TossPayReadyParam,
  TossPayReadyResponse,
  TossPayRegisterSubscriptionParam,
  TossPayRegisterSubscriptionResponse,
} from "./tosspay/type";

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
    [KakaoPayAPI.ApproveSubscription]: [
      KakaoPayApproveSubscriptionParam,
      KakaoPayApproveSubscriptionResponse
    ];
    [KakaoPayAPI.CheckSubscription]: [
      KakaoPayCheckSubscriptionParam,
      KakaoPayCheckSubscriptionResponse
    ];
    [KakaoPayAPI.GetPayment]: [
      KakaoPayGetPaymentParam,
      KakaoPayGetPaymentResponse
    ];
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
    /*! https://developer.pay.naver.com/docs/v2/api#etc-etc_recurrent_reserve */
    [NaverPayAPI.PrepareRegisterSubscription]: [
      NaverPayPrepareRegisterSubscriptionParam,
      NaverPayPrepareRegisterSubscriptionResponse
    ];
    [NaverPayAPI.RegisterSubscription]: [
      NaverPayRegisterSubscriptionParam,
      NaverPayRegisterSubscriptionResponse
    ];
    [NaverPayAPI.InactivateSubscription]: [
      NaverPayInactivateSubscriptionParam,
      NaverPayInactivateSubscriptionResponse
    ];
    [NaverPayAPI.CheckSubscription]: [
      NaverPayCheckSubscriptionParam,
      NaverPayCheckSubscriptionResponse
    ];
    [NaverPayAPI.ReserveSubscription]: [
      NaverPayReserveSubscriptionParam,
      NaverPayReserveSubscriptionResponse
    ];
    [NaverPayAPI.ApproveSubscription]: [
      NaverPayApproveSubscriptionParam,
      NaverPayApproveSubscriptionResponse
    ];
  };
  [Payment.TOSSPAY]: {
    [TossPayAPI.Ready]: [TossPayReadyParam, TossPayReadyResponse];
    [TossPayAPI.ApproveOnetime]: [
      TossPayApproveOnetimeParam,
      TossPayApproveOnetimeResponse
    ];
    [TossPayAPI.GetPayment]: [
      TossPayGetPaymentParam,
      TossPayGetPaymentResponse
    ];
    [TossPayAPI.CancelPayment]: [TossPayCancelParam, TossPayCancelResponse];
    [TossPayAPI.RegisterSubscription]: [
      TossPayRegisterSubscriptionParam,
      TossPayRegisterSubscriptionResponse
    ];
    [TossPayAPI.ApproveSubscription]: [
      TossPayApproveSubscriptionParam,
      TossPayApproveSubscriptionResponse
    ];
    [TossPayAPI.CheckSubscription]: [
      TossPayCheckSubscriptionParam,
      TossPayCheckSubscriptionResponse
    ];
    [TossPayAPI.InactivateSubscription]: [
      TossPayInactivateSubscriptionParam,
      TossPayInactivateSubscriptionResponse
    ];
  };
  [Payment.TOSS_PAYMENTS]: {
    [TossPaymentsAPI.ApproveOnetime]: [
      TossPaymentsApproveParam,
      TossPaymentsApproveResponse
    ];
    [TossPaymentsAPI.CancelPayment]: [
      TossPaymentsCancelPaymentParam,
      TossPaymentsCancelPaymentResponse
    ];
    [TossPaymentsAPI.GetPayment]: [
      TossPaymentsGetPaymentParam,
      TossPaymentsGetPaymentResponse
    ];
    [TossPaymentsAPI.RegisterSubscription]: [
      TossPaymentsRegisterSubscriptionParam,
      TossPaymentsRegisterSubscriptionResponse
    ];
    [TossPaymentsAPI.ApproveSubscription]: [
      TossPaymentsApproveSubscriptionParam,
      TossPaymentsApproveSubscriptionResponse
    ];
  };
  [Payment.NICEPAY]: {
    [NicePayAPI.RegisterSubscription]: [
      NicePayRegisterSubscriptionParam,
      NicePayRegisterSubscriptionResponse
    ];
    [NicePayAPI.ApproveSubscription]: [
      NicePayApproveSubscriptionParam,
      NicePayApproveSubscriptionResponse
    ];
    [NicePayAPI.InactivateSubscription]: [
      NicePayInactivateSubscriptionParam,
      NicePayInactivateSubscriptionResponse
    ];
    [NicePayAPI.CancelPayment]: [
      NicePayCancelPaymentParam,
      NicePayCancelPaymentResponse
    ];
  };
};

export type PaymentType = {
  [Payment.IAMPORT]: Iamport;
  [Payment.KAKAOPAY]: KakaoPay;
  [Payment.NAVERPAY]: NaverPay;
  [Payment.NICEPAY]: NicePay;
  [Payment.TOSS_PAYMENTS]: TossPayments;
  [Payment.TOSSPAY]: TossPay;
};

export type ApproveOnetimeParam = {
  [Payment.IAMPORT]: IamportApproveOnetimeParam;
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: TossPaymentsApproveParam;
  [Payment.KAKAOPAY]: KakaoPayApproveParam;
  [Payment.NAVERPAY]: NaverPayApproveOnetimeParam;
  [Payment.TOSSPAY]: TossPayApproveOnetimeParam;
};
export type ApproveOnetimeResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: TossPaymentsApproveResponse;
  [Payment.KAKAOPAY]: KakaoPayApproveResponse;
  [Payment.NAVERPAY]: NaverPayApproveOnetimeResponse;
  [Payment.TOSSPAY]: TossPayApproveOnetimeResponse;
};
export type ApproveOnetimeFailResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: TossPaymentsFailResponse;
  [Payment.KAKAOPAY]: KakaoPayFailResponse;
  [Payment.NAVERPAY]: NaverPayFailResponse;
  [Payment.TOSSPAY]: TossPayFailResponse;
};

export type GetPaymentParam = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: TossPaymentsGetPaymentParam;
  [Payment.KAKAOPAY]: KakaoPayGetPaymentParam;
  [Payment.NAVERPAY]: NaverPayGetPaymentParam;
  [Payment.TOSSPAY]: TossPayGetPaymentParam;
};
export type GetPaymentResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: TossPaymentsGetPaymentResponse;
  [Payment.KAKAOPAY]: KakaoPayGetPaymentResponse;
  [Payment.NAVERPAY]: NaverPayGetPaymentResponse;
  [Payment.TOSSPAY]: TossPayGetPaymentResponse;
};
export type GetPaymentFailResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS_PAYMENTS]: TossPaymentsFailResponse;
  [Payment.KAKAOPAY]: KakaoPayFailResponse;
  [Payment.NAVERPAY]: NaverPayFailResponse;
  [Payment.TOSSPAY]: TossPayFailResponse;
};

export type InactivateSubscriptionParam = {
  [Payment.KAKAOPAY]: KakaoPayInactivateSubscriptionParam;
  [Payment.NAVERPAY]: NaverPayInactivateSubscriptionParam;
  [Payment.TOSSPAY]: TossPayInactivateSubscriptionParam;
};
export type InactivateSubscriptionResponse = {
  [Payment.KAKAOPAY]: KakaoPayInactivateSubscriptionResponse;
  [Payment.NAVERPAY]: NaverPayInactivateSubscriptionResponse;
  [Payment.TOSSPAY]: TossPayInactivateSubscriptionResponse;
};
export type InactivateSubscriptionFailResponse = {
  [Payment.KAKAOPAY]: KakaoPayFailResponse;
  [Payment.NAVERPAY]: NaverPayFailResponse;
  [Payment.TOSSPAY]: TossPayFailResponse;
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
  [Payment.NICEPAY]: NicePayRegisterSubscriptionParam;
  [Payment.TOSS_PAYMENTS]: TossPaymentsRegisterSubscriptionParam;
  [Payment.KAKAOPAY]: KakaoPayRegisterSubscriptionParam;
  [Payment.NAVERPAY]: NaverPayRegisterSubscriptionParam;
  [Payment.TOSSPAY]: TossPayRegisterSubscriptionParam;
};
export type RegisterSubscriptionResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: NicePayRegisterSubscriptionResponse;
  [Payment.TOSS_PAYMENTS]: TossPaymentsRegisterSubscriptionResponse;
  [Payment.KAKAOPAY]: KakaoPayRegisterSubscriptionResponse;
  [Payment.NAVERPAY]: NaverPayRegisterSubscriptionResponse;
  [Payment.TOSSPAY]: TossPayRegisterSubscriptionResponse;
};
export type RegisterSubscriptionFailResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: NicePayResponse;
  [Payment.TOSS_PAYMENTS]: TossPaymentsFailResponse;
  [Payment.KAKAOPAY]: KakaoPayFailResponse;
  [Payment.NAVERPAY]: NaverPayFailResponse;
  [Payment.TOSSPAY]: TossPayFailResponse;
};
export type ApproveSubscriptionParam = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: NicePayApproveSubscriptionParam;
  [Payment.TOSS_PAYMENTS]: TossPaymentsApproveSubscriptionParam;
  [Payment.KAKAOPAY]: KakaoPayApproveSubscriptionParam;
  [Payment.NAVERPAY]: NaverPayApproveSubscriptionParam;
  [Payment.TOSSPAY]: TossPayApproveSubscriptionParam;
};
export type ApproveSubscriptionResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: NicePayApproveSubscriptionResponse;
  [Payment.TOSS_PAYMENTS]: TossPaymentsApproveResponse;
  [Payment.KAKAOPAY]: KakaoPayApproveSubscriptionResponse;
  [Payment.NAVERPAY]: NaverPayApproveSubscriptionResponse;
  [Payment.TOSSPAY]: TossPayApproveSubscriptionResponse;
};
export type ApproveSubscriptionFailResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: NicePayResponse;
  [Payment.TOSS_PAYMENTS]: TossPaymentsFailResponse;
  [Payment.KAKAOPAY]: KakaoPayFailResponse;
  [Payment.NAVERPAY]: NaverPayFailResponse;
  [Payment.TOSSPAY]: TossPayFailResponse;
};

export type CancelPaymentParam = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: NicePayCancelPaymentParam;
  [Payment.TOSS_PAYMENTS]: TossPaymentsCancelPaymentParam;
  [Payment.KAKAOPAY]: KakaoPayCancelParam;
  [Payment.NAVERPAY]: NaverPayCancelPaymentParam;
  [Payment.TOSSPAY]: TossPayCancelParam;
};
export type CancelPaymentResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: NicePayCancelPaymentResponse;
  [Payment.TOSS_PAYMENTS]: TossPaymentsCancelPaymentResponse;
  [Payment.KAKAOPAY]: KakaoPayCancelResponse;
  [Payment.NAVERPAY]: NaverPayCancelPaymentResponse;
  [Payment.TOSSPAY]: TossPayCancelResponse;
};
export type CancelPaymentFailResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: NicePayResponse;
  [Payment.TOSS_PAYMENTS]: TossPaymentsFailResponse;
  [Payment.KAKAOPAY]: KakaoPayFailResponse;
  [Payment.NAVERPAY]: NaverPayFailResponse;
  [Payment.TOSSPAY]: TossPayFailResponse;
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
