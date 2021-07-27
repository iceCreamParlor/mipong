import { AxiosResponse } from "axios";
import {
  SubscriptionCheckable,
  Inactivable,
  Payment,
  PaymentLib,
  PaymentAPISignature,
  doRequest,
  getSecret,
  PaymentAPI,
  retry,
} from "..";
import { ApproveSubscriptionResponse, PaymentResponse } from "../type";
import {
  TossPaymentsAPI,
  TossPaymentsApproveOnetimeParam,
  TossPaymentsFailResponse,
} from "./type";

export class TossPayments implements PaymentLib<Payment.TOSS_PAYMENTS> {
  private _baseUrl: string = "https://api.tosspayments.com";
  private static _instance: TossPayments | undefined = undefined;

  async withPaymentResponse<T>(
    fn: () => Promise<AxiosResponse<T | TossPaymentsFailResponse>>
  ): Promise<PaymentResponse<T, TossPaymentsFailResponse>> {
    const response = await retry({ fn });
    if (response.status === 200) {
      return {
        success: true,
        statusCode: response.status,
        data: response.data as T,
      };
    }
    return {
      success: false,
      statusCode: response.status,
      data: response.data as TossPaymentsFailResponse,
    };
  }

  private async callAPI<T extends TossPaymentsAPI>(
    api: T,
    params: PaymentAPISignature[Payment.TOSS_PAYMENTS][T][0]
  ): Promise<AxiosResponse<PaymentAPISignature[Payment.TOSS_PAYMENTS][T][1]>> {
    return doRequest({
      baseUrl: this._baseUrl,
      requestParams: {
        ...params,
        apiKey: getSecret().TOSSPAY_API_KEY,
      },
      api: PaymentAPI[Payment.TOSS_PAYMENTS][api],
    });
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
    input: TossPaymentsApproveOnetimeParam
  ): Promise<PaymentResponse<{}, {}>> {
    throw new Error("Method not implemented.");
  }

  public static get instance(): TossPayments {
    if (this._instance === undefined) {
      this._instance = new TossPayments();
    }
    return this._instance;
  }
}
