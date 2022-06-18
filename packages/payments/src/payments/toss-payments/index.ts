import { AxiosResponse } from "axios";
import {
  convert2Base64,
  doRequest,
  omit,
  Payment,
  PaymentAPI,
  PaymentLib,
  retry,
} from "..";
import { PaymentAPISignature, PaymentResponse } from "../type";
import {
  TossPaymentsAPI,
  TossPaymentsApproveParam,
  TossPaymentsApproveResponse,
  TossPaymentsApproveSubscriptionParam,
  TossPaymentsApproveSubscriptionResponse,
  TossPaymentsCancelPaymentParam,
  TossPaymentsCancelPaymentResponse,
  TossPaymentsFailResponse,
  TossPaymentsGetPaymentParam,
  TossPaymentsGetPaymentResponse,
  TossPaymentsRegisterSubscriptionParam,
  TossPaymentsRegisterSubscriptionResponse,
} from "./type";

export class TossPayments implements PaymentLib<Payment.TOSS_PAYMENTS> {
  private readonly _secret: TossPaymentsSecret;
  private _baseUrl: string = "https://api.tosspayments.com";
  private static _instance: TossPayments | undefined = undefined;

  public static getInstance(params?: TossPaymentsSecret): TossPayments {
    if (this._instance === undefined) {
      this._instance = new TossPayments(params);
    }
    return this._instance;
  }

  constructor(params?: TossPaymentsSecret) {
    this._secret = params ?? {
      TOSS_SECRET_ONETIME_KEY: process.env.TOSS_SECRET_ONETIME_KEY ?? "",
      TOSS_SECRET_SUBSCRIPTION_KEY:
        process.env.TOSS_SECRET_SUBSCRIPTION_KEY ?? "",
      TOSS_CLIENT_ID: process.env.TOSS_CLIENT_ID ?? "",
    };
  }

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
    params: Omit<
      PaymentAPISignature[Payment.TOSS_PAYMENTS][T][0],
      omittableKey
    >,
    type: "onetime" | "subscription",
    replace?: { [key: string]: string }
  ): Promise<AxiosResponse<PaymentAPISignature[Payment.TOSS_PAYMENTS][T][1]>> {
    return doRequest({
      baseUrl: this._baseUrl,
      headers: {
        Authorization: `Basic ${convert2Base64(
          `${
            type === "onetime"
              ? this._secret.TOSS_SECRET_ONETIME_KEY
              : this._secret.TOSS_SECRET_SUBSCRIPTION_KEY
          }:`
        )}`,
      },
      requestParams: params,
      api: PaymentAPI[Payment.TOSS_PAYMENTS][api],
      replace,
    }).catch((err) => {
      if (
        err.isAxiosError &&
        [200, 400, 403, 500].includes(err.response.status)
      ) {
        console.log(err.response.data);
        return err.response;
      }
      throw err;
    });
  }

  approveOnetime(
    params: TossPaymentsApproveParam
  ): Promise<
    PaymentResponse<TossPaymentsApproveResponse, TossPaymentsFailResponse>
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(
        TossPaymentsAPI.ApproveOnetime,
        this.omitPaymentKey(params),
        "onetime",
        {
          paymentKey: params.paymentKey,
        }
      )
    );
  }

  cancelPayment(
    params: TossPaymentsCancelPaymentParam,
    type: "onetime" | "subscription"
  ): Promise<
    PaymentResponse<TossPaymentsCancelPaymentResponse, TossPaymentsFailResponse>
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(
        TossPaymentsAPI.CancelPayment,
        this.omitPaymentKey(params),
        type,
        {
          paymentKey: params.paymentKey,
        }
      )
    );
  }

  getPayment(
    params: TossPaymentsGetPaymentParam,
    type: "onetime" | "subscription"
  ): Promise<
    PaymentResponse<TossPaymentsGetPaymentResponse, TossPaymentsFailResponse>
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(
        TossPaymentsAPI.GetPayment,
        this.omitPaymentKey(params),
        type,
        {
          paymentKey: params.paymentKey,
        }
      )
    );
  }

  registerSubscription(
    params: TossPaymentsRegisterSubscriptionParam
  ): Promise<
    PaymentResponse<
      TossPaymentsRegisterSubscriptionResponse,
      TossPaymentsFailResponse
    >
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(
        TossPaymentsAPI.RegisterSubscription,
        this.omitAuthKey(params),
        "subscription",
        {
          authKey: params.authKey,
        }
      )
    );
  }
  approveSubscription(
    params: TossPaymentsApproveSubscriptionParam
  ): Promise<
    PaymentResponse<
      TossPaymentsApproveSubscriptionResponse,
      TossPaymentsFailResponse
    >
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(
        TossPaymentsAPI.ApproveSubscription,
        this.omitBillingKey(params),
        "subscription",
        {
          billingKey: params.billingKey,
        }
      )
    );
  }

  private omitPaymentKey<T>(params: T): Omit<T, "paymentKey"> {
    return omit(params, ["paymentKey"]);
  }
  private omitAuthKey<T>(params: T): Omit<T, "authKey"> {
    return omit(params, ["authKey"]);
  }
  private omitBillingKey<T>(params: T): Omit<T, "billingKey"> {
    return omit(params, ["billingKey"]);
  }
}
type omittableKey = "paymentKey" | "authKey" | "billingKey";
export interface TossPaymentsSecret {
  readonly TOSS_SECRET_ONETIME_KEY: string;
  readonly TOSS_SECRET_SUBSCRIPTION_KEY: string;
  readonly TOSS_CLIENT_ID: string;
}
