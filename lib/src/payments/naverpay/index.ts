import { AxiosResponse } from "axios";
import { SubscriptionCheckable, Inactivable, Payment, PaymentLib } from "..";
import { ExecuteSubscriptionResponse, PaymentResponse } from "../type";
import {
  NaverPayApproveOnetimeParam,
  NaverPayBillingKeyCheckParam,
  NaverPayBillingKeyCheckResponse,
  NaverPayFailResponse,
  NaverPayInactivateBiilingKeyResponse,
  NaverPayInactivateBillingKeyParam,
} from "./type";

export class NaverPay
  implements
    PaymentLib<Payment.NAVERPAY>,
    Inactivable<Payment.NAVERPAY>,
    SubscriptionCheckable<Payment.NAVERPAY>
{
  checkSubscription(
    params: NaverPayBillingKeyCheckParam
  ): Promise<
    PaymentResponse<NaverPayBillingKeyCheckResponse, NaverPayFailResponse>
  > {
    throw new Error("Method not implemented.");
  }
  inactivateSubscription(
    params: NaverPayInactivateBillingKeyParam
  ): Promise<
    PaymentResponse<
      NaverPayInactivateBiilingKeyResponse | NaverPayFailResponse,
      NaverPayInactivateBiilingKeyResponse | NaverPayFailResponse
    >
  > {
    throw new Error("Method not implemented.");
  }
  registerSubscription(params: {}): Promise<PaymentResponse<{}, {}>> {
    throw new Error("Method not implemented.");
  }
  executeSubscription(params: {}): Promise<PaymentResponse<{}, {}>> {
    throw new Error("Method not implemented.");
  }
  cancelPayment(
    params: {},
    type?: "onetime" | "subscription"
  ): Promise<PaymentResponse<{}, {}>> {
    throw new Error("Method not implemented.");
  }
  getPayment(
    params: {},
    type?: "onetime" | "subscription"
  ): Promise<PaymentResponse<{}, {}>> {
    throw new Error("Method not implemented.");
  }
  withPaymentResponse(fn: () => Promise<AxiosResponse<any>>): Promise<any> {
    throw new Error("Method not implemented.");
  }
  approveOnetime(
    input: NaverPayApproveOnetimeParam
  ): Promise<PaymentResponse<{}, {}>> {
    throw new Error("Method not implemented.");
  }
  private static _instance: NaverPay = new NaverPay();

  public static get instance(): NaverPay {
    return this._instance;
  }
}
