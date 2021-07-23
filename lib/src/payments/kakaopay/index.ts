import axios, { AxiosResponse } from "axios";
import {
  convertUrlEncodedParam,
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
  KakaoPayAPI,
  KakaoPayApproveParam,
  KakaoPayApproveResponse,
  KakaoPayCancelParam,
  KakaoPayCancelResponse,
  KakaoPayCheckSubscriptionParam,
  KakaoPayCheckSubscriptionResponse,
  KakaoPayExecuteSubscriptionParam,
  KakaoPayExecuteSubscriptionResponse,
  KakaoPayFailResponse,
  KakaoPayGetPaymentParam,
  KakaoPayGetPaymentResponse,
  KakaoPayInactivateSubscriptionParam,
  KakaoPayInactivateSubscriptionResponse,
  KakaoPayReadyParam,
  KakaoPayReadyResponse,
  KakaoPayRegisterSubscriptionParam,
  KakaoPayRegisterSubscriptionResponse,
} from "./type";

export class KakaoPay
  implements
    PaymentLib<Payment.KAKAOPAY>,
    Inactivable<Payment.KAKAOPAY>,
    SubscriptionCheckable<Payment.KAKAOPAY>
{
  private static _instance: KakaoPay | undefined = undefined;
  private _baseUrl: string = "https://kapi.kakao.com";
  private _onetimeCid: string = getSecret().KAKAOPAY_ONETIME_CID;
  private _subscriptionCid: string = getSecret().KAKAOPAY_SUBSCRIPTION_CID;
  private _kakaopayAPI = PaymentAPI[Payment.KAKAOPAY];

  public static get instance(): KakaoPay {
    if (this._instance === undefined) {
      this._instance = new KakaoPay();
    }
    return this._instance;
  }

  async withPaymentResponse<T>(
    fn: () => Promise<AxiosResponse<T>>
  ): Promise<PaymentResponse<T, KakaoPayFailResponse>> {
    const result = await retry({ fn });
    if (result.status === 200) {
      return {
        success: true,
        statusCode: result.status,
        data: result.data,
      };
    }
    return {
      success: false,
      statusCode: result.status,
      data: result.data as any,
    };
  }

  private async callAPI<T extends KakaoPayAPI>(
    api: T,
    params: PaymentAPISignature[Payment.KAKAOPAY][T][0],
    type: "onetime" | "subscription"
  ): Promise<AxiosResponse<PaymentAPISignature[Payment.KAKAOPAY][T][1]>> {
    const cid = type === "onetime" ? this._onetimeCid : this._subscriptionCid;
    if (!cid) {
      throw new Error(`[Kakaopay] ${type} CID is empty.`);
    }

    const requestParam = convertUrlEncodedParam(params);
    requestParam.append("cid", cid);

    return axios
      .post(`${this._baseUrl}${this._kakaopayAPI[api].url}`, requestParam, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: `KakaoAK ${getSecret().KAKAOPAY_ADMIN_KEY}`,
        },
        timeout: 10 * 1000,
      })
      .catch((err) => {
        if (err.isAxiosError && [200, 400, 500].includes(err.response.status)) {
          console.log(err.response.data);
          return err.response;
        }
        throw err;
      });
  }

  async ready(
    params: KakaoPayReadyParam,
    type: "onetime" | "subscription"
  ): Promise<PaymentResponse<KakaoPayReadyResponse, KakaoPayFailResponse>> {
    return this.withPaymentResponse(() =>
      this.callAPI(KakaoPayAPI.Ready, params, type)
    );
  }

  approveOnetime(
    params: KakaoPayApproveParam
  ): Promise<PaymentResponse<KakaoPayApproveResponse, KakaoPayFailResponse>> {
    return this.withPaymentResponse(() =>
      this.callAPI(KakaoPayAPI.Approve, params, "onetime")
    );
  }
  registerSubscription(
    params: KakaoPayRegisterSubscriptionParam
  ): Promise<
    PaymentResponse<KakaoPayRegisterSubscriptionResponse, KakaoPayFailResponse>
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(KakaoPayAPI.RegisterSubscription, params, "subscription")
    );
  }
  executeSubscription(
    params: KakaoPayExecuteSubscriptionParam
  ): Promise<
    PaymentResponse<KakaoPayExecuteSubscriptionResponse, KakaoPayFailResponse>
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(KakaoPayAPI.ExecuteSubscription, params, "subscription")
    );
  }

  cancelPayment(
    params: KakaoPayCancelParam,
    type: "onetime" | "subscription"
  ): Promise<PaymentResponse<KakaoPayCancelResponse, KakaoPayFailResponse>> {
    return this.withPaymentResponse(() =>
      this.callAPI(KakaoPayAPI.CancelPayment, params, type)
    );
  }

  getPayment(
    params: KakaoPayGetPaymentParam,
    type: "onetime" | "subscription"
  ): Promise<
    PaymentResponse<KakaoPayGetPaymentResponse, KakaoPayFailResponse>
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(KakaoPayAPI.GetPayment, params, type)
    );
  }
  inactivateSubscription(
    params: KakaoPayInactivateSubscriptionParam
  ): Promise<
    PaymentResponse<
      KakaoPayInactivateSubscriptionResponse,
      KakaoPayFailResponse
    >
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(KakaoPayAPI.InactivateSubscription, params, "subscription")
    );
  }
  checkSubscription(
    params: KakaoPayCheckSubscriptionParam
  ): Promise<
    PaymentResponse<KakaoPayCheckSubscriptionResponse, KakaoPayFailResponse>
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(KakaoPayAPI.CheckSubscription, params, "subscription")
    );
  }
}
