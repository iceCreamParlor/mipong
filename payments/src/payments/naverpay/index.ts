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
  NaverPayAPI,
  NaverPayApproveOnetimeParam,
  NaverPayApproveOnetimeResponse,
  NaverPayApproveSubscriptionParam,
  NaverPayApproveSubscriptionResponse,
  NaverPayCancelPaymentParam,
  NaverPayCancelPaymentResponse,
  NaverPayCheckSubscriptionParam,
  NaverPayCheckSubscriptionResponse,
  NaverPayFailResponse,
  NaverPayGetPaymentParam,
  NaverPayGetPaymentResponse,
  NaverPayInactivateSubscriptionParam,
  NaverPayInactivateSubscriptionResponse,
  NaverPayPrepareRegisterSubscriptionParam,
  NaverPayPrepareRegisterSubscriptionResponse,
  NaverPayRegisterSubscriptionParam,
  NaverPayRegisterSubscriptionResponse,
  NaverPayReserveSubscriptionParam,
  NaverPayReserveSubscriptionResponse,
  NaverPayResponse,
} from "./type";

export class NaverPay
  implements
    PaymentLib<Payment.NAVERPAY>,
    Inactivable<Payment.NAVERPAY>,
    SubscriptionCheckable<Payment.NAVERPAY>
{
  private readonly _secret: NaverPaySecret;
  private static _instance: NaverPay | undefined = undefined;
  private _baseUrl: string;

  public static getInstance(param?: NaverPaySecret): NaverPay {
    if (this._instance === undefined) {
      this._instance = new NaverPay(param);
    }
    return this._instance;
  }

  private constructor(param?: NaverPaySecret) {
    this._secret = param ?? {
      NAVERPAY_CLIENT_ID: process.env.NAVERPAY_CLIENT_ID ?? "",
      NAVERPAY_CLIENT_SECRET: process.env.NAVERPAY_CLIENT_SECRET ?? "",
      NAVERPAY_ONETIME_CHAIN_ID: process.env.NAVERPAY_ONETIME_CHAIN_ID ?? "",
      NAVERPAY_SUBSCRIPTION_CHAIN_ID:
        process.env.NAVERPAY_SUBSCRIPTION_CHAIN_ID ?? "",
      NAVERPAY_PARTNER_ID: process.env.NAVERPAY_PARTNER_ID ?? "",
      NAVERPAY_DEV_MODE: process.env.NAVERPAY_DEV_MODE === "true" ?? false,
    };
    this._baseUrl = this._secret.NAVERPAY_DEV_MODE
      ? "https://apis.naver.com"
      : "https://dev.apis.naver.com";
  }

  async withPaymentResponse<T extends NaverPayResponse>(
    fn: () => Promise<AxiosResponse<T>>
  ): Promise<PaymentResponse<T, NaverPayFailResponse>> {
    const response = await retry({ fn });
    if (response.status === 200 && response.data.code === "Success") {
      return {
        success: true,
        statusCode: response.status,
        data: response.data,
      };
    }
    return {
      success: false,
      statusCode: response.status,
      data: response.data as NaverPayFailResponse,
    };
  }

  private async callAPI<T extends NaverPayAPI>(
    api: T,
    params: PaymentAPISignature[Payment.NAVERPAY][T][0],
    type: "onetime" | "subscription"
  ): Promise<AxiosResponse<PaymentAPISignature[Payment.NAVERPAY][T][1]>> {
    const chainId =
      type === "onetime"
        ? this.secret.NAVERPAY_ONETIME_CHAIN_ID
        : this.secret.NAVERPAY_SUBSCRIPTION_CHAIN_ID;

    const requestBaseUrl = `${this._baseUrl}/${this.secret.NAVERPAY_PARTNER_ID}`;

    return doRequest({
      baseUrl: requestBaseUrl,
      requestParams: params,
      headers: {
        "X-NaverPay-Chain-Id": chainId,
        "X-Naver-Client-Id": this.secret.NAVERPAY_CLIENT_ID,
        "X-Naver-Client-Secret": this.secret.NAVERPAY_CLIENT_SECRET,
      },
      api: PaymentAPI[Payment.NAVERPAY][api],
    }).catch((err) => {
      console.error(err);
      throw err;
    });
  }

  approveOnetime(
    params: NaverPayApproveOnetimeParam
  ): Promise<
    PaymentResponse<NaverPayApproveOnetimeResponse, NaverPayFailResponse>
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(NaverPayAPI.ApproveOnetime, params, "onetime")
    );
  }

  cancelPayment(
    params: NaverPayCancelPaymentParam,
    type: "onetime" | "subscription"
  ): Promise<
    PaymentResponse<NaverPayCancelPaymentResponse, NaverPayFailResponse>
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(NaverPayAPI.CancelPayment, params, type)
    );
  }

  getPayment(
    params: NaverPayGetPaymentParam,
    type: "onetime" | "subscription"
  ): Promise<
    PaymentResponse<NaverPayGetPaymentResponse, NaverPayFailResponse>
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(NaverPayAPI.GetPayment, params, type)
    );
  }
  prepareRegisterSubscription(
    params: NaverPayPrepareRegisterSubscriptionParam
  ): Promise<
    PaymentResponse<
      NaverPayPrepareRegisterSubscriptionResponse,
      NaverPayFailResponse
    >
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(
        NaverPayAPI.PrepareRegisterSubscription,
        params,
        "subscription"
      )
    );
  }
  registerSubscription(
    params: NaverPayRegisterSubscriptionParam
  ): Promise<
    PaymentResponse<NaverPayRegisterSubscriptionResponse, NaverPayFailResponse>
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(NaverPayAPI.RegisterSubscription, params, "subscription")
    );
  }

  checkSubscription(
    params: NaverPayCheckSubscriptionParam
  ): Promise<
    PaymentResponse<NaverPayCheckSubscriptionResponse, NaverPayFailResponse>
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(NaverPayAPI.CheckSubscription, params, "subscription")
    );
  }
  inactivateSubscription(
    params: NaverPayInactivateSubscriptionParam
  ): Promise<
    PaymentResponse<
      NaverPayInactivateSubscriptionResponse,
      NaverPayFailResponse
    >
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(NaverPayAPI.InactivateSubscription, params, "subscription")
    );
  }
  reserveSubscription(
    params: NaverPayReserveSubscriptionParam
  ): Promise<
    PaymentResponse<NaverPayReserveSubscriptionResponse, NaverPayFailResponse>
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(NaverPayAPI.ReserveSubscription, params, "subscription")
    );
  }

  approveSubscription(
    params: NaverPayApproveSubscriptionParam
  ): Promise<
    PaymentResponse<NaverPayApproveSubscriptionResponse, NaverPayFailResponse>
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(NaverPayAPI.ApproveSubscription, params, "subscription")
    );
  }
  private get secret(): NaverPaySecret {
    return this._secret;
  }
}
export interface NaverPaySecret {
  readonly NAVERPAY_PARTNER_ID: string;
  readonly NAVERPAY_CLIENT_ID: string;
  readonly NAVERPAY_CLIENT_SECRET: string;
  readonly NAVERPAY_ONETIME_CHAIN_ID: string;
  readonly NAVERPAY_SUBSCRIPTION_CHAIN_ID: string;
  readonly NAVERPAY_DEV_MODE: boolean;
}
