import { AxiosResponse } from "axios";
import { SubscriptionCheckable, Inactivable, Payment, PaymentLib } from "..";
import { ApproveSubscriptionResponse, PaymentResponse } from "../type";
import { TossPaymentsApproveOnetimeParam } from "./type";

export class TossPayments implements PaymentLib<Payment.TOSS_PAYMENTS> {
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
    input: TossPaymentsApproveOnetimeParam
  ): Promise<PaymentResponse<{}, {}>> {
    throw new Error("Method not implemented.");
  }
  private static _instance: TossPayments = new TossPayments();

  public static get instance(): TossPayments {
    return this._instance;
  }
}
