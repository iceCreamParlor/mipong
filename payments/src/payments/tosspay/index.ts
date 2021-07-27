import { AxiosResponse } from "axios";
import {
  doRequest,
  getSecret,
  Inactivable,
  Payment,
  PaymentAPI,
  PaymentAPISignature,
  PaymentLib,
  retry,
  SubscriptionCheckable,
} from "..";
import { PaymentResponse } from "../type";
import {
  TossPayAPI,
  TossPayApproveOnetimeParam,
  TossPayApproveOnetimeResponse,
  TossPayApproveSubscriptionParam,
  TossPayApproveSubscriptionResponse,
  TossPayCancelParam,
  TossPayCancelResponse,
  TossPayCheckSubscriptionParam,
  TossPayCheckSubscriptionResponse,
  TossPayFailResponse,
  TossPayGetPaymentParam,
  TossPayGetPaymentResponse,
  TossPayInactivateSubscriptionParam,
  TossPayInactivateSubscriptionResponse,
  TossPayReadyParam,
  TossPayReadyResponse,
  TossPayRegisterSubscriptionParam,
  TossPayRegisterSubscriptionResponse,
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

  registerSubscription(
    params: TossPayRegisterSubscriptionParam
  ): Promise<
    PaymentResponse<TossPayRegisterSubscriptionResponse, TossPayFailResponse>
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(TossPayAPI.RegisterSubscription, params)
    );
  }

  approveSubscription(
    params: TossPayApproveSubscriptionParam
  ): Promise<
    PaymentResponse<TossPayApproveSubscriptionResponse, TossPayFailResponse>
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(TossPayAPI.ApproveSubscription, params)
    );
  }

  checkSubscription(
    params: TossPayCheckSubscriptionParam
  ): Promise<
    PaymentResponse<TossPayCheckSubscriptionResponse, TossPayFailResponse>
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(TossPayAPI.CheckSubscription, params)
    );
  }
  inactivateSubscription(
    params: TossPayInactivateSubscriptionParam
  ): Promise<
    PaymentResponse<TossPayInactivateSubscriptionResponse, TossPayFailResponse>
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(TossPayAPI.InactivateSubscription, params)
    );
  }

  private static _instance: TossPay = new TossPay();

  public static get instance(): TossPay {
    return this._instance;
  }
}
