import { AxiosResponse } from "axios";
import { SubscriptionCheckable, Inactivable, Payment, PaymentLib } from "..";
import { ApproveSubscriptionResponse, PaymentResponse } from "../type";
import {
  TossPayApproveOnetimeParam,
  TossPayBillingKeyCheckParam,
  TossPayBillingKeyCheckResponse,
  TossPayFailResponse,
} from "./type";

export class TossPay
  implements
    PaymentLib<Payment.TOSSPAY>,
    Inactivable<Payment.TOSSPAY>,
    SubscriptionCheckable<Payment.TOSSPAY>
{
  checkSubscription(
    params: TossPayBillingKeyCheckParam
  ): Promise<
    PaymentResponse<TossPayBillingKeyCheckResponse, TossPayFailResponse>
  > {
    throw new Error("Method not implemented.");
  }
  inactivateSubscription(params: {
    billingKey: string;
  }): Promise<PaymentResponse<{}, {}>> {
    throw new Error("Method not implemented.");
  }
  registerSubscription(params: {}): Promise<PaymentResponse<{}, {}>> {
    throw new Error("Method not implemented.");
  }
  approveSubscription(params: {}): Promise<PaymentResponse<{}, {}>> {
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
    input: TossPayApproveOnetimeParam
  ): Promise<PaymentResponse<{}, {}>> {
    throw new Error("Method not implemented.");
  }
  private static _instance: TossPay = new TossPay();

  public static get instance(): TossPay {
    return this._instance;
  }
}
