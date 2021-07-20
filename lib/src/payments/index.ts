import {
  ApproveOnetimeParam,
  ApproveOnetimeResponse,
  BillingKeyCheckParam,
  InactivateBillingKeyParam,
} from "./type";

export enum Payment {
  KAKAOPAY = "kakaopay",
  NAVERPAY = "naverpay",
  NICEPAY = "nicepay",
  TOSS = "toss",
  TOSSPAY = "tosspay",
  IAMPORT = "iamport",
}
export type InactivablePayment =
  | Payment.KAKAOPAY
  | Payment.NAVERPAY
  | Payment.TOSSPAY;

export type BillingKeyCheckablePayment =
  | Payment.KAKAOPAY
  | Payment.NAVERPAY
  | Payment.TOSSPAY;

export abstract class PaymentLib<T extends Payment> {
  // 일반결제 승인
  abstract approveOnetime(
    input: ApproveOnetimeParam[T]
  ): Promise<ApproveOnetimeResponse[T]>;

  // 정기결제 등록
  abstract registerSubscription(
    input: RegisterSubscriptionParam[T]
  ): Promise<RegisterSubscriptionResponse[T]>;

  // 정기결제 실행
  abstract executeSubscription(
    order: tbOrder,
    subscriptionKey: string
  ): Promise<ExecuteSubscriptionResponse>;

  // 첫정기결제 실행
  abstract executeFirstSubscription(
    input: ExecuteFirstSubscriptionParam,
    order: tbOrder
  ): Promise<ExecuteSubscriptionResponse>;

  // 결제 취소
  abstract cancelPayment(
    order: tbOrder,
    UNID: number,
    amount: number
  ): Promise<CommonCancelPaymentResponse>;

  // 결제 조회
  abstract getPayment(order: tbOrder): Promise<CommonGetPaymentResponse>;
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
