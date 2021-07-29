import * as crypto from "crypto";
import { AxiosResponse } from "axios";
import {
  doRequest,
  getSecret,
  handleError,
  Payment,
  PaymentAPI,
  PaymentAPISignature,
  PaymentLib,
  retry,
} from "..";
import { ApproveSubscriptionResponse, PaymentResponse } from "../type";
import {
  NicePayAPI,
  NicePayApproveSubscriptionParam,
  NicePayApproveSubscriptionResponse,
  NicePayCancelPaymentParam,
  NicePayCancelPaymentResponse,
  NicePayRegisterSubscriptionParam,
  NicePayRegisterSubscriptionResponse,
  NicePayResponse,
  NicePaySuccessCode,
} from "./type";

export class NicePay implements PaymentLib<Payment.NICEPAY> {
  private _baseUrl: string = "https://webapi.nicepay.co.kr/webapi";

  async withPaymentResponse<T extends NicePayResponse>(
    fn: () => Promise<AxiosResponse<T>>,
    api: NicePayAPI
  ): Promise<PaymentResponse<T, NicePayResponse>> {
    const response = await retry({ fn });
    const successCode = NicePaySuccessCode[api];
    if (response.data.ResultCode === successCode) {
      return {
        success: true,
        statusCode: response.status,
        data: response.data,
      };
    }
    return {
      success: false,
      statusCode: response.status,
      data: response.data,
    };
  }
  private async callAPI<T extends NicePayAPI>(
    api: T,
    params: PaymentAPISignature[Payment.NICEPAY][T][0],
    type: "onetime" | "subscription"
  ): Promise<AxiosResponse<PaymentAPISignature[Payment.NICEPAY][T][1]>> {
    const requestParams = {
      ...params,
      ...{ MID: params.MID ?? getSecret().NICEPAY_MERCHANT_ID },
    };
    return doRequest({
      baseUrl: this._baseUrl,
      requestParams,
      api: PaymentAPI[Payment.NICEPAY][api],
    }).catch((err) => {
      throw err;
    });
  }

  getPayment(
    params: {},
    type?: "onetime" | "subscription"
  ): Promise<PaymentResponse<{}, {}>> {
    throw new Error("Method not implemented.");
  }

  approveOnetime(params: any): Promise<PaymentResponse<{}, {}>> {
    throw new Error("Method not implemented.");
  }
  registerSubscription(
    params: NicePayRegisterSubscriptionParam
  ): Promise<
    PaymentResponse<NicePayRegisterSubscriptionResponse, NicePayResponse>
  > {
    throw new Error("Method not implemented.");
  }
  approveSubscription(
    params: NicePayApproveSubscriptionParam
  ): Promise<
    PaymentResponse<NicePayApproveSubscriptionResponse, NicePayResponse>
  > {
    throw new Error("Method not implemented.");
  }
  cancelPayment(
    params: NicePayCancelPaymentParam
  ): Promise<PaymentResponse<NicePayCancelPaymentResponse, NicePayResponse>> {
    throw new Error("Method not implemented.");
  }

  private static _instance: NicePay = new NicePay();

  public static get instance(): NicePay {
    return this._instance;
  }
  private getSignData(str: string): string {
    const shasum = crypto.createHash("sha256");
    shasum.update(str);
    return shasum.digest("hex");
  }
}
