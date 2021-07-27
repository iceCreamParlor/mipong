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
  getSecret,
} from "..";
import { ApproveSubscriptionResponse, PaymentResponse } from "../type";
import {
  TossPayAPI,
  TossPayApproveOnetimeParam,
  TossPayApproveOnetimeResponse,
  TossPayBillingKeyCheckParam,
  TossPayBillingKeyCheckResponse,
  TossPayCancelParam,
  TossPayCancelResponse,
  TossPayFailResponse,
  TossPayGetPaymentParam,
  TossPayGetPaymentResponse,
  TossPayReadyParam,
  TossPayReadyResponse,
  TossPayResponse,
} from "./type";

export class TossPay
  implements
    PaymentLib<Payment.TOSSPAY>,
    Inactivable<Payment.TOSSPAY>,
    SubscriptionCheckable<Payment.TOSSPAY>
{
  private _baseUrl: string = "https://pay.toss.im";

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
    params: PaymentAPISignature[Payment.TOSSPAY][T][0]
  ): Promise<AxiosResponse<PaymentAPISignature[Payment.TOSSPAY][T][1]>> {
    return doRequest({
      baseUrl: this._baseUrl,
      requestParams: {
        ...params,
        apiKey: getSecret().TOSSPAY_API_KEY,
      },
      api: PaymentAPI[Payment.TOSSPAY][api],
    });
  }
  ready(
    params: TossPayReadyParam
  ): Promise<PaymentResponse<TossPayReadyResponse, TossPayFailResponse>> {
    return this.withPaymentResponse(() =>
      this.callAPI(TossPayAPI.Ready, params)
    );
  }

  approveOnetime(
    params: TossPayApproveOnetimeParam
  ): Promise<
    PaymentResponse<TossPayApproveOnetimeResponse, TossPayFailResponse>
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(TossPayAPI.ApproveOnetime, params)
    );
  }

  getPayment(
    params: TossPayGetPaymentParam,
    type?: "onetime" | "subscription"
  ): Promise<PaymentResponse<TossPayGetPaymentResponse, TossPayFailResponse>> {
    return this.withPaymentResponse(() =>
      this.callAPI(TossPayAPI.GetPayment, params)
    );
  }

  cancelPayment(
    params: TossPayCancelParam
  ): Promise<PaymentResponse<TossPayCancelResponse, TossPayFailResponse>> {
    return this.withPaymentResponse(() =>
      this.callAPI(TossPayAPI.CancelPayment, params)
    );
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

  private static _instance: TossPay = new TossPay();

  public static get instance(): TossPay {
    return this._instance;
  }
}
