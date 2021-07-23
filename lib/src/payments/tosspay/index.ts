import { AxiosResponse } from "axios";
import { BillingKeyCheckable, Inactivable, Payment, PaymentLib } from "..";
import { ExecuteSubscriptionResponse, PaymentResponse } from "../type";
import { TossPayApproveOnetimeParam } from "./type";

export class TossPay
  implements
    PaymentLib<Payment.TOSSPAY>,
    Inactivable<Payment.TOSSPAY>,
    BillingKeyCheckable<Payment.TOSSPAY>
{
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
