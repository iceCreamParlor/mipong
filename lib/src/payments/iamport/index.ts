import { AxiosResponse } from "axios";
import { Payment, PaymentLib } from "..";
import { PaymentResponse, ExecuteSubscriptionResponse } from "../type";
import { IamportApproveOnetimeParam } from "./type";

export class Iamport implements PaymentLib<Payment.IAMPORT> {
  registerSubscription(params: {}): Promise<PaymentResponse<{}, {}>> {
    throw new Error("Method not implemented.");
  }
  executeSubscription(params: {}): Promise<PaymentResponse<{}, {}>> {
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
  private static _instance: Iamport = new Iamport();

  public static get instance(): Iamport {
    return this._instance;
  }
  approveOnetime(
    input: IamportApproveOnetimeParam
  ): Promise<PaymentResponse<{}, {}>> {
    throw new Error("Method not implemented.");
  }
}
