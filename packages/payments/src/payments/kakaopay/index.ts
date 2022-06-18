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
  KakaoPayAPI,
  KakaoPayApproveParam,
  KakaoPayApproveResponse,
  KakaoPayApproveSubscriptionParam,
  KakaoPayApproveSubscriptionResponse,
  KakaoPayCancelParam,
  KakaoPayCancelResponse,
  KakaoPayCheckSubscriptionParam,
  KakaoPayCheckSubscriptionResponse,
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
  private readonly _secret: KakaoPaySecret;
  private _baseUrl: string = "https://kapi.kakao.com";

  public static getInstance(params?: KakaoPaySecret): KakaoPay {
    if (this._instance === undefined) {
      this._instance = new KakaoPay(params);
    }

    return this._instance;
  }

  private constructor(params?: KakaoPaySecret) {
    this._secret = params ?? {
      KAKAOPAY_ONETIME_CID: process.env.KAKAOPAY_ONETIME_CID ?? "",
      KAKAOPAY_SUBSCRIPTION_CID: process.env.KAKAOPAY_SUBSCRIPTION_CID ?? "",
      KAKAOPAY_ADMIN_KEY: process.env.KAKAOPAY_ADMIN_KEY ?? "",
    };
  }

  async withPaymentResponse<T>(
    fn: () => Promise<AxiosResponse<T | KakaoPayFailResponse>>
  ): Promise<PaymentResponse<T, KakaoPayFailResponse>> {
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
      data: response.data as KakaoPayFailResponse,
    };
  }

  private async callAPI<T extends KakaoPayAPI>(
    api: T,
    params: PaymentAPISignature[Payment.KAKAOPAY][T][0],
    type: "onetime" | "subscription"
  ): Promise<AxiosResponse<PaymentAPISignature[Payment.KAKAOPAY][T][1]>> {
    const cid =
      type === "onetime"
        ? this.secret.KAKAOPAY_ONETIME_CID
        : this.secret.KAKAOPAY_SUBSCRIPTION_CID;
    if (!cid) {
      throw new Error(`[Kakaopay] ${type} CID is empty.`);
    }

    return doRequest({
      baseUrl: this._baseUrl,
      requestParams: {
        ...params,
        cid,
      },
      headers: {
        Authorization: `KakaoAK ${this.secret.KAKAOPAY_ADMIN_KEY}`,
      },
      api: PaymentAPI[Payment.KAKAOPAY][api],
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
  approveSubscription(
    params: KakaoPayApproveSubscriptionParam
  ): Promise<
    PaymentResponse<KakaoPayApproveSubscriptionResponse, KakaoPayFailResponse>
  > {
    return this.withPaymentResponse(() =>
      this.callAPI(KakaoPayAPI.ApproveSubscription, params, "subscription")
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

  private get secret(): KakaoPaySecret {
    return this._secret;
  }
}
export interface KakaoPaySecret {
  readonly KAKAOPAY_ADMIN_KEY: string;
  readonly KAKAOPAY_ONETIME_CID: string;
  readonly KAKAOPAY_SUBSCRIPTION_CID: string;
}
