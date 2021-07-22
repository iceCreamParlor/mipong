import { BillingKeyCheckable, Inactivable, Payment, PaymentLib } from "..";
import { ExecuteSubscriptionResponse } from "../type";
import { TossPayApproveOnetimeParam } from "./type";

export class TossPay
  extends PaymentLib<Payment.TOSSPAY>
  implements Inactivable<Payment.TOSSPAY>, BillingKeyCheckable<Payment.TOSSPAY>
{
  private static _instance: TossPay = new TossPay();

  public static get instance(): TossPay {
    return this._instance;
  }

  approveOnetime(input: TossPayApproveOnetimeParam): Promise<{}> {
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

  checkBillingKeyStatus(param: {
    userId: string;
    displayId: string;
  }): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  inactivateBillingKey(param: { billingKey: string }): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
