import { BillingKeyCheckable, Inactivable, Payment, PaymentLib } from "..";

export class NaverPay
  extends PaymentLib
  implements
    Inactivable<Payment.KAKAOPAY>,
    BillingKeyCheckable<Payment.KAKAOPAY>
{
  approveOnetime(input: any, order: any): Promise<PaymentResponse> {
    throw new Error("Method not implemented.");
  }
  registerSubscription(input: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  executeSubscription(order: any, subscriptionKey: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  executeFirstSubscription(input: any, order: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  cancelPayment(order: any, UNID: number, amount: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
  checkBillingKeyStatus(param: {
    cid_secret?: string | undefined;
    sid: string;
  }): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  inactivateBillingKey(param: { sid: string }): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
