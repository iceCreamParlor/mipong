import { AxiosResponse } from "axios";
import { Payment, PaymentLib } from "..";
import { PaymentResponse, ExecuteSubscriptionResponse } from "../type";
import { IamportApproveOnetimeParam } from "./type";

export class Iamport implements PaymentLib<Payment.IAMPORT> {
  withPaymentResponse(fn: () => Promise<AxiosResponse<any>>): Promise<any> {
    throw new Error("Method not implemented.");
  }
  private static _instance: Iamport = new Iamport();

  public static get instance(): Iamport {
    return this._instance;
  }
  approveOnetime(
    input: IamportApproveOnetimeParam
  ): Promise<PaymentResponse<{}, {}>> {
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
