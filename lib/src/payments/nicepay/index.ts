import { AxiosResponse } from "axios";
import { Payment, PaymentLib } from "..";
import { ExecuteSubscriptionResponse, PaymentResponse } from "../type";
import { NicePayApproveOnetimeParam } from "./type";

export class NicePay implements PaymentLib<Payment.NICEPAY> {
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
  getPayment(input: {}): Promise<{}> {
    throw new Error("Method not implemented.");
  }
}
