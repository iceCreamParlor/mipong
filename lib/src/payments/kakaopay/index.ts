import axios, { AxiosResponse } from "axios";
import {
  BillingKeyCheckable,
  convertUrlEncodedParam,
  getSecret,
  Inactivable,
  Payment,
  PaymentAPI,
  PaymentAPISignature,
  PaymentLib,
  retry,
} from "..";
import { ExecuteSubscriptionResponse, PaymentResponse } from "../type";
import {
  KakaoPayAPI,
  KakaoPayApproveParam,
  KakaoPayApproveResponse,
  KakaoPayBillingKeyCheckParam,
  KakaoPayFailResponse,
  KakaoPayGetPaymentParam,
  KakaoPayGetPaymentResponse,
  KakaoPayInactivateBillingKeyParam,
  KakaoPayReadyParam,
  KakaoPayReadyResponse,
} from "./type";

export class KakaoPay
  implements
    PaymentLib<Payment.KAKAOPAY>,
    Inactivable<Payment.KAKAOPAY>,
    BillingKeyCheckable<Payment.KAKAOPAY>
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
    input: KakaoPayApproveParam
  ): Promise<PaymentResponse<KakaoPayApproveResponse, KakaoPayFailResponse>> {
    throw new Error("Method not implemented.");
  }

  registerSubscription(input: {}): Promise<{}> {
    throw new Error("Method not implemented.");
  }
  executeSubscription(input: {}): Promise<ExecuteSubscriptionResponse> {
    throw new Error("Method not implemented.");
  }
  executeFirstSubscription(input: {}): Promise<{}> {
    throw new Error("Method not implemented.");
  }
  cancelPayment(input: {}): Promise<{}> {
    throw new Error("Method not implemented.");
  }
  getPayment(
    input: KakaoPayGetPaymentParam
  ): Promise<KakaoPayFailResponse | KakaoPayGetPaymentResponse> {
    throw new Error("Method not implemented.");
  }
  checkBillingKeyStatus(param: KakaoPayBillingKeyCheckParam): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  inactivateBillingKey(
    param: KakaoPayInactivateBillingKeyParam
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
