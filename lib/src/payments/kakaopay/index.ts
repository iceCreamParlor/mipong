import { BillingKeyCheckable, Inactivable, Payment, PaymentLib } from "..";
import { ExecuteSubscriptionResponse } from "../type";
import {
  KakaoPayApproveParam,
  KakaoPayApproveResponse,
  KakaoPayBillingKeyCheckParam,
  KakaoPayFailResponse,
  KakaoPayGetPaymentParam,
  KakaoPayGetPaymentResponse,
  KakaoPayInactivateBillingKeyParam,
} from "./type";

export class Kakaopay
  extends PaymentLib<Payment.KAKAOPAY>
  implements
    Inactivable<Payment.KAKAOPAY>,
    BillingKeyCheckable<Payment.KAKAOPAY>
{
  approveOnetime(
    input: KakaoPayApproveParam
  ): Promise<KakaoPayApproveResponse | KakaoPayFailResponse> {
    throw new Error("Method not implemented.");
  }
  registerSubscription(input: {}): Promise<{}> {
    throw new Error("Method not implemented.");
  }
  executeSubscription(input: {}): Promise<ExecuteSubscriptionResponse> {
    throw new Error("Method not implemented.");
  }
  executeFirstSubscription(input: {}): Promise<{}> {
    throw new Error("Method not implemented.");
  }
  cancelPayment(input: {}): Promise<{}> {
    throw new Error("Method not implemented.");
  }
  getPayment(
    input: KakaoPayGetPaymentParam
  ): Promise<KakaoPayFailResponse | KakaoPayGetPaymentResponse> {
    throw new Error("Method not implemented.");
  }
  checkBillingKeyStatus(param: KakaoPayBillingKeyCheckParam): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  inactivateBillingKey(
    param: KakaoPayInactivateBillingKeyParam
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
