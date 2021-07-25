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
  NaverPayAPI,
  NaverPayApproveOnetimeParam,
  NaverPayApproveOnetimeResponse,
  NaverPayCancelPaymentParam,
  NaverPayCancelPaymentResponse,
  NaverPayCheckSubscriptionParam,
  NaverPayCheckSubscriptionResponse,
  NaverPayFailResponse,
  NaverPayGetPaymentParam,
  NaverPayGetPaymentResponse,
  NaverPayInactivateSubscriptionParam,
  NaverPayInactivateSubscriptionResponse,
  NaverPayRegisterSubscriptionParam,
  NaverPayRegisterSubscriptionResponse,
  NaverPayResponse,
} from "./type";

export class NaverPay
  implements
    PaymentLib<Payment.NAVERPAY>,
    Inactivable<Payment.NAVERPAY>,
    SubscriptionCheckable<Payment.NAVERPAY>
{
  private static _instance: NaverPay | undefined = undefined;
  private _isDev: boolean = getSecret().NAVERPAY_DEV_MODE ?? false;
  private _baseUrl: string = this._isDev
    ? "https://apis.naver.com"
    : "https://dev.apis.naver.com";

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
        ? getSecret().NAVERPAY_ONETIME_CHAIN_ID
        : getSecret().NAVERPAY_SUBSCRIPTION_CHAIN_ID;

    const requestBaseUrl = `${this._baseUrl}/${
      getSecret().NAVERPAY_PARTNER_ID
    }`;

    return doRequest({
      baseUrl: requestBaseUrl,
      requestParams: params,
      headers: {
        "X-NaverPay-Chain-Id": chainId,
        "X-Naver-Client-Id": getSecret().NAVERPAY_CLIENT_ID,
        "X-Naver-Client-Secret": getSecret().NAVERPAY_CLIENT_SECRET,
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
    throw new Error("Method not implemented.");
  }
  inactivateSubscription(
    params: NaverPayInactivateSubscriptionParam
  ): Promise<
    PaymentResponse<
      NaverPayInactivateSubscriptionResponse | NaverPayFailResponse,
      NaverPayInactivateSubscriptionResponse | NaverPayFailResponse
    >
  > {
    throw new Error("Method not implemented.");
  }

  approveSubscription(params: {}): Promise<PaymentResponse<{}, {}>> {
    throw new Error("Method not implemented.");
  }

  public static get instance(): NaverPay {
    if (this._instance === undefined) {
      this._instance = new NaverPay();
    }
    return this._instance;
  }
}
