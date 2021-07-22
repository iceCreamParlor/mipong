import { Payment, PaymentLib } from "..";
import { ExecuteSubscriptionResponse } from "../type";
import { NicePayApproveOnetimeParam } from "./type";

export class NicePay extends PaymentLib<Payment.NICEPAY> {
  private static _instance: NicePay = new NicePay();

  public static get instance(): NicePay {
    return this._instance;
  }

  approveOnetime(input: NicePayApproveOnetimeParam): Promise<{}> {
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
  getPayment(input: {}): Promise<{}> {
    throw new Error("Method not implemented.");
  }
}
