import { BillingKeyCheckable, Inactivable, Payment, PaymentLib } from "..";
import {
  KakaoPayBillingKeyCheckParam,
  KakaoPayInactivateBillingKeyParam,
} from "../kakaopay/type";
import { ExecuteSubscriptionResponse } from "../type";
import {
  NaverPayApproveOnetimeParam,
  NaverPayBillingKeyCheckParam,
  NaverPayFailResponse,
  NaverPayInactivateBillingKeyParam,
} from "./type";

export class NaverPay
  extends PaymentLib<Payment.NAVERPAY>
  implements
    Inactivable<Payment.NAVERPAY>,
    BillingKeyCheckable<Payment.NAVERPAY>
{
  approveOnetime(input: NaverPayApproveOnetimeParam): Promise<{}> {
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
