import axios, { AxiosResponse } from "axios";
import {
  API,
  BillingKeyCheckable,
  convertUrlEncodedParam,
  getSecret,
  handleError,
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
  extends PaymentLib<Payment.KAKAOPAY>
  implements
    Inactivable<Payment.KAKAOPAY>,
    BillingKeyCheckable<Payment.KAKAOPAY>
{
  private static _instance: KakaoPay = new KakaoPay();
  private _baseUrl: string = "https://kapi.kakao.com";
  private _onetimeCid: string = getSecret().KAKAOPAY_ONETIME_CID;
  private _subscriptionCid: string = getSecret().KAKAOPAY_SUBSCRIPTION_CID;
  private _kakaopayAPI = PaymentAPI[Payment.KAKAOPAY];

  public static get instance(): KakaoPay {
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
    const requestParam = convertUrlEncodedParam(params);
    const cid = type === "onetime" ? this._onetimeCid : this._subscriptionCid;
    if (!cid) {
      throw new Error(`[Kakaopay] ${type} CID is empty.`);
    }
    requestParam.append("cid", this._onetimeCid);
    return axios
      .post(`${this._baseUrl}${this._kakaopayAPI[api].url}`, requestParam, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: `KakaoAK ${getSecret().KAKAOPAY_ADMIN_KEY}`,
        },
        timeout: 10 * 1000,
      })
      .catch(handleError);
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
