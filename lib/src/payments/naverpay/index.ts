import axios, { AxiosResponse } from "axios";
import {
  SubscriptionCheckable,
  Inactivable,
  Payment,
  PaymentLib,
  retry,
  PaymentAPISignature,
  getSecret,
  PaymentAPI,
  convertUrlEncodedParam,
  handleError,
  doRequest,
} from "..";
import { ExecuteSubscriptionResponse, PaymentResponse } from "../type";
import {
  NaverPayApproveOnetimeParam,
  NaverPayCheckSubscriptionParam,
  NaverPayCheckSubscriptionResponse,
  NaverPayFailResponse,
  NaverPayInactivateSubscriptionResponse,
  NaverPayInactivateSubscriptionParam,
  NaverPayResponse,
  NaverPayAPI,
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
      getSecret().pay.NAVERPAY_PARTNER_ID
    }`;

    return doRequest({
      baseUrl: requestBaseUrl,
      requestParams: params,
      headers: {
        "X-NaverPay-Chain-Id": chainId,
        "X-Naver-Client-Id": getSecret().pay.NAVERPAY_CLIENT_ID,
        "X-Naver-Client-Secret": getSecret().pay.NAVERPAY_CLIENT_SECRET,
      },
      api: PaymentAPI[Payment.NAVERPAY][api],
    }).catch((err) => {
      console.error(err);
      throw err;
    });
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
  registerSubscription(params: {}): Promise<PaymentResponse<{}, {}>> {
    throw new Error("Method not implemented.");
  }
  executeSubscription(params: {}): Promise<PaymentResponse<{}, {}>> {
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
    input: NaverPayApproveOnetimeParam
  ): Promise<PaymentResponse<{}, {}>> {
    throw new Error("Method not implemented.");
  }

  public static get instance(): NaverPay {
    if (this._instance === undefined) {
      this._instance = new NaverPay();
    }
    return this._instance;
  }
}
