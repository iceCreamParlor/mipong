import { BillingKeyCheckable, Inactivable, Payment, PaymentLib } from "..";
import { ExecuteSubscriptionResponse } from "../type";
import { TossPaymentsApproveOnetimeParam } from "./type";

export class TossPayments extends PaymentLib<Payment.TOSS_PAYMENTS> {
  private static _instance: TossPayments = new TossPayments();

  public static get instance(): TossPayments {
    return this._instance;
  }

  approveOnetime(input: TossPaymentsApproveOnetimeParam): Promise<{}> {
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