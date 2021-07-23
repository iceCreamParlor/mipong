import { AxiosResponse } from "axios";
import { BillingKeyCheckable, Inactivable, Payment, PaymentLib } from "..";
import { ExecuteSubscriptionResponse, PaymentResponse } from "../type";
import { TossPaymentsApproveOnetimeParam } from "./type";

export class TossPayments implements PaymentLib<Payment.TOSS_PAYMENTS> {
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
