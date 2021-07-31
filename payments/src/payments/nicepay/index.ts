import axios, { AxiosResponse } from "axios";
import * as crypto from "crypto";
import { randomBytes } from "crypto";
import * as iconv from "iconv-lite";
import {
  filterTruthy,
  handleError,
  omit,
  Payment,
  PaymentAPI,
  PaymentLib,
  retry,
} from "..";
import { PaymentAPISignature, PaymentResponse } from "../type";
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
  private readonly _secret: NicePaySecret;
  private static _instance: NicePay;
  private _baseUrl: string = "https://webapi.nicepay.co.kr/webapi";
  private _encoding: string = "euc-kr";

  public static getInstance(param?: NicePaySecret): NicePay {
    if (this._instance === undefined) {
      this._instance = new NicePay(param);
    }
    return this._instance;
  }

  private constructor(param?: NicePaySecret) {
    this._secret = param ?? {
      NICEPAY_MERCHANT_ID: process.env.NICEPAY_MERCHANT_ID ?? "",
      NICEPAY_CANCEL_PASSWORD: process.env.NICEPAY_CANCEL_PASSWORD ?? "",
      NICEPAY_MERCHANT_KEY: process.env.NICEPAY_MERCHANT_KEY ?? "",
    };
  }

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
    const isEucKr = !params.CharSet || params.CharSet === "euc-kr";

    return axios
      .post(
        `${this._baseUrl}${PaymentAPI[Payment.NICEPAY][api].url}`,
        iconv.encode(this.convertUrlEncodedParam(params), this._encoding),
        {
          headers: {
            "Content-Type": PaymentAPI[Payment.NICEPAY][api].contentType,
          },
          timeout: 60 * 1000,
          ...(isEucKr ? { responseType: "arraybuffer" } : {}),
        }
      )
      .then((response) => {
        if (!isEucKr) {
          return response;
        }
        const decodedResponse = iconv.decode(response.data, this._encoding);
        return {
          ...response,
          data: JSON.parse(decodedResponse),
        };
      })
      .catch(handleError);
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
    const mid = this.getMid();
    const mkey = this.getMerchantKey();
    const ediDate = this.yyyymmddhhmiss();
    const moid = randomBytes(20).toString("hex");

    const { CardNo, ExpYear, ExpMonth, IDNo, CardPw } = params;

    const requestParams = filterTruthy(
      omit(params, ["CardNo", "ExpYear", "ExpMonth", "IDNo", "CardPw"])
    );

    return this.withPaymentResponse(
      () =>
        this.callAPI(
          NicePayAPI.RegisterSubscription,
          {
            MID: mid,
            EdiDate: ediDate,
            Moid: moid,
            EncData: this.getEncData(
              `CardNo=${CardNo}&ExpYear=${ExpYear}&ExpMonth=${ExpMonth}&IDNo=${IDNo}&CardPw=${CardPw}`,
              mkey
            ),
            SignData: this.getSignData(`${mid}${ediDate}${moid}${mkey}`),
            ...requestParams,
            BuyerTel: requestParams.BuyerTel.replace(/-/g, ""),
          },
          "subscription"
        ),
      NicePayAPI.RegisterSubscription
    );
  }
  approveSubscription(
    params: NicePayApproveSubscriptionParam
  ): Promise<
    PaymentResponse<NicePayApproveSubscriptionResponse, NicePayResponse>
  > {
    const mid = this.getMid();
    const mkey = this.getMerchantKey();
    const ediDate = this.yyyymmddhhmiss();

    return this.withPaymentResponse(
      () =>
        this.callAPI(
          NicePayAPI.ApproveSubscription,
          {
            MID: mid,
            TID: this.createTid(mid),
            EdiDate: ediDate,
            SignData: this.getSignData(
              `${mid}${ediDate}${params.Moid}${params.Amt}${params.BID}${mkey}`
            ),
            ...params,
            BuyerTel: params.BuyerTel.replace(/-/g, ""),
          },
          "subscription"
        ),
      NicePayAPI.ApproveSubscription
    );
  }
  cancelPayment(
    params: NicePayCancelPaymentParam,
    type: "onetime" | "subscription"
  ): Promise<PaymentResponse<NicePayCancelPaymentResponse, NicePayResponse>> {
    const mid = this.getMid();
    const merchantKey = this.getMerchantKey();
    const ediDate = this.yyyymmddhhmiss();

    return this.withPaymentResponse(
      () =>
        this.callAPI(
          NicePayAPI.CancelPayment,
          {
            MID: mid,
            EdiDate: ediDate,
            SignData: this.getSignData(
              `${mid}${params.CancelAmt}${ediDate}${merchantKey}`
            ),
            ...params,
          },
          type
        ),
      NicePayAPI.CancelPayment
    );
  }

  // 현재시간 YYYYMMDDHHMISS 포맷
  private yyyymmddhhmiss(): string {
    return new Date().toISOString().slice(0, 19).replace(/[-:T]/g, "");
  }

  /*!
   * 모든 결제건은 규칙에 따라 유니크한 TID 를 생성합니다.
   * 따라서, 빌키 승인 요청 시 가맹점에서 생성하는 TID도 다른 모든 TID에 대하여 유니크해야 하며,
   * 동일한 TID 로 결제 요청 시 실패로 처리됩니다.
   *
   * TID(30) = MID(10) + 지불수단(2) + 매체구분(2) + 시간정보(12) + 랜덤숫자(4)
   *
   * 상세 내용은 상단 링크에 있는 개발문서 참고바랍니다.
   */
  private createTid(mid: string): string {
    /*! 지불수단: 신용카드 */
    const payMethod = "01";
    /*! 매체구분: 빌링 */
    const mediaType = "16";
    const timeInfo = new Date()
      .toISOString()
      .slice(2, 19)
      .replace(/[-:T]/g, "");
    const random = Math.floor(Math.random() * 10000);

    return mid + payMethod + mediaType + timeInfo + random;
  }

  private getEncData(plainText: string, merchantKey: string): string {
    const encKey = merchantKey.slice(0, 16);

    const cipher = crypto.createCipheriv(
      "aes-128-ecb",
      encKey,
      Buffer.alloc(0)
    );
    return Buffer.concat([
      cipher.update(plainText, "utf8"),
      cipher.final(),
    ]).toString("hex");
  }
  private getMerchantKey(): string {
    return this.secret.NICEPAY_MERCHANT_KEY;
  }
  private getMid(): string {
    return this.secret.NICEPAY_MERCHANT_ID;
  }
  private getSignData(str: string): string {
    const shasum = crypto.createHash("sha256");
    shasum.update(str);
    return shasum.digest("hex");
  }
  private convertUrlEncodedParam(param: { [key: string]: any }) {
    return Object.keys(param)
      .map((key) => `${key}=${param[key]}`)
      .join("&");
  }
  private get secret() {
    return this._secret;
  }
}
export interface NicePaySecret {
  readonly NICEPAY_MERCHANT_ID: string;
  readonly NICEPAY_MERCHANT_KEY: string;
  readonly NICEPAY_CANCEL_PASSWORD: string;
}
