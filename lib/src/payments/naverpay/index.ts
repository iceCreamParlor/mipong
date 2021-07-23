import { AxiosResponse } from "axios";
import { BillingKeyCheckable, Inactivable, Payment, PaymentLib } from "..";
import { ExecuteSubscriptionResponse, PaymentResponse } from "../type";
import {
  NaverPayApproveOnetimeParam,
  NaverPayBillingKeyCheckParam,
  NaverPayFailResponse,
  NaverPayInactivateBillingKeyParam,
} from "./type";

export class NaverPay
  implements
    PaymentLib<Payment.NAVERPAY>,
    Inactivable<Payment.NAVERPAY>,
    BillingKeyCheckable<Payment.NAVERPAY>
{
  withPaymentResponse(fn: () => Promise<AxiosResponse<any>>): Promise<any> {
    throw new Error("Method not implemented.");
  }
  approveOnetime(
    input: NaverPayApproveOnetimeParam
  ): Promise<PaymentResponse<{}, {}>> {
    throw new Error("Method not implemented.");
  }
  private static _instance: NaverPay = new NaverPay();

  public static get instance(): NaverPay {
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
  getPayment(input: {}): Promise<{} | NaverPayFailResponse> {
    throw new Error("Method not implemented.");
  }
  checkBillingKeyStatus(param: NaverPayBillingKeyCheckParam): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  inactivateBillingKey(
    param: NaverPayInactivateBillingKeyParam
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
