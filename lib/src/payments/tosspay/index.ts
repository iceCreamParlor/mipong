import { BillingKeyCheckable, Inactivable, Payment, PaymentLib } from "..";

export class TossPay
  extends PaymentLib
  implements Inactivable<Payment.TOSSPAY>, BillingKeyCheckable<Payment.TOSSPAY>
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
    userId: string;
    displayId: string;
  }): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  inactivateBillingKey(param: { billingKey: string }): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
