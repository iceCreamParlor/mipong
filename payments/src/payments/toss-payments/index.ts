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
  convert2Base64,
  omit,
} from "..";
import { TossPayAPI } from "../tosspay/type";
import { ApproveSubscriptionResponse, PaymentResponse } from "../type";
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
    params: Omit<
      PaymentAPISignature[Payment.TOSS_PAYMENTS][T][0],
      omittableKey
    >,
    replace?: { [key: string]: string }
  ): Promise<AxiosResponse<PaymentAPISignature[Payment.TOSS_PAYMENTS][T][1]>> {
    return doRequest({
      baseUrl: this._baseUrl,
      headers: {
        Authorization: `Basic ${convert2Base64(
          `${getSecret().TOSS_SECRET_KEY}:`
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
        {
          paymentKey: params.paymentKey,
        }
      )
    );
  }

  cancelPayment(
    params: TossPaymentsCancelPaymentParam
  ): Promise<
    PaymentResponse<TossPaymentsCancelPaymentResponse, TossPaymentsFailResponse>
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(TossPaymentsAPI.CancelPayment, this.omitPaymentKey(params), {
        paymentKey: params.paymentKey,
      })
    );
  }

  getPayment(
    params: TossPaymentsGetPaymentParam
  ): Promise<
    PaymentResponse<TossPaymentsGetPaymentResponse, TossPaymentsFailResponse>
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(TossPaymentsAPI.GetPayment, this.omitPaymentKey(params), {
        paymentKey: params.paymentKey,
      })
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
        {
          billingKey: params.billingKey,
        }
      )
    );
  }

  public static get instance(): TossPayments {
    if (this._instance === undefined) {
      this._instance = new TossPayments();
    }
    return this._instance;
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
