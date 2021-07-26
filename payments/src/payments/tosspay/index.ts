import { AxiosResponse } from "axios";
import {
  SubscriptionCheckable,
  Inactivable,
  Payment,
  PaymentLib,
  retry,
  PaymentAPISignature,
  doRequest,
  PaymentAPI,
} from "..";
import { ApproveSubscriptionResponse, PaymentResponse } from "../type";
import {
  TossPayAPI,
  TossPayApproveOnetimeParam,
  TossPayBillingKeyCheckParam,
  TossPayBillingKeyCheckResponse,
  TossPayFailResponse,
  TossPayResponse,
} from "./type";

export class TossPay
  implements
    PaymentLib<Payment.TOSSPAY>,
    Inactivable<Payment.TOSSPAY>,
    SubscriptionCheckable<Payment.TOSSPAY>
{
  private _baseUrl: string = "https://pay.toss.im/api";

  async withPaymentResponse<T extends TossPayResponse>(
    fn: () => Promise<AxiosResponse<T>>
  ): Promise<PaymentResponse<T, TossPayFailResponse>> {
    const response = await retry({ fn });
    if (response.status === 200 && response.data.code === 0) {
      return {
        success: true,
        statusCode: response.status,
        data: response.data,
      };
    }
    return {
      success: false,
      statusCode: response.status,
      data: response.data as TossPayFailResponse,
    };
  }

  private async callAPI<T extends TossPayAPI>(
    api: T,
    params: PaymentAPISignature[Payment.TOSSPAY][T][0],
    type: "onetime" | "subscription"
  ): Promise<AxiosResponse<PaymentAPISignature[Payment.TOSSPAY][T][1]>> {
    return doRequest({
      baseUrl: this._baseUrl,
      requestParams: params,
      api: PaymentAPI[Payment.TOSSPAY][api],
    });
  }

  checkSubscription(
    params: TossPayBillingKeyCheckParam
  ): Promise<
    PaymentResponse<TossPayBillingKeyCheckResponse, TossPayFailResponse>
  > {
    throw new Error("Method not implemented.");
  }
  inactivateSubscription(params: {
    billingKey: string;
  }): Promise<PaymentResponse<{}, {}>> {
    throw new Error("Method not implemented.");
  }
  registerSubscription(params: {}): Promise<PaymentResponse<{}, {}>> {
    throw new Error("Method not implemented.");
  }
  approveSubscription(params: {}): Promise<PaymentResponse<{}, {}>> {
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

  approveOnetime(
    input: TossPayApproveOnetimeParam
  ): Promise<PaymentResponse<{}, {}>> {
    throw new Error("Method not implemented.");
  }
  private static _instance: TossPay = new TossPay();

  public static get instance(): TossPay {
    return this._instance;
  }
}
