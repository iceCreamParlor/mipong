import { AxiosResponse } from "axios";
import {
  doRequest,
  Inactivable,
  Payment,
  PaymentAPI,
  PaymentLib,
  retry,
  SubscriptionCheckable,
} from "..";
import { PaymentAPISignature, PaymentResponse } from "../type";
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
  private _secret: TossPaySecret;
  private _baseUrl: string = "https://pay.toss.im";
  private static _instance: TossPay | undefined;

  public static getInstance(params?: TossPaySecret): TossPay {
    if (this._instance === undefined) {
      this._instance = new TossPay(params);
    }
    return this._instance;
  }

  private constructor(params?: TossPaySecret) {
    this._secret = params ?? {
      TOSSPAY_API_KEY: process.env.TOSSPAY_API_KEY ?? "",
    };
  }

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
        apiKey: this._secret.TOSSPAY_API_KEY,
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
  private get sercret() {
    return this._secret;
  }
}
export interface TossPaySecret {
  readonly TOSSPAY_API_KEY: string;
}
