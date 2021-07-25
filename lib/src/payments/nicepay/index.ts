import { AxiosResponse } from "axios";
import { Payment, PaymentLib } from "..";
import { ApproveSubscriptionResponse, PaymentResponse } from "../type";
import { NicePayApproveOnetimeParam } from "./type";

export class NicePay implements PaymentLib<Payment.NICEPAY> {
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
    input: NicePayApproveOnetimeParam
  ): Promise<PaymentResponse<{}, {}>> {
    throw new Error("Method not implemented.");
  }
  private static _instance: NicePay = new NicePay();

  public static get instance(): NicePay {
    return this._instance;
  }
}
