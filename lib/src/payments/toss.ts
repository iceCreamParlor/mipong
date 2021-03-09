import axios, { AxiosInstance } from "axios";
import { isEmpty } from "../misc/string";

export class TossService {
  private _tossAxios: AxiosInstance;

  constructor(private clientId?: string, private secretKey?: string) {
    clientId = clientId ?? this.getClientId();
    secretKey = secretKey ?? this.getSecretKey();

    this._tossAxios = axios.create({
      baseURL: "https://api.tosspayments.com",
      headers: {
        Authorization: `Basic ${this.convert2Base64(secretKey + ":")}`,
        "Content-Type": "application/json",
      },
    });
  }

  async approveOneTime(paymentKey: string, approveParam: TossApproveParam) {
    return (
      await this._tossAxios.post(`/v1/payments/${paymentKey}`, approveParam)
    ).data;
  }

  convert2Base64(str: string): string {
    return Buffer.from(str).toString("base64");
  }

  get tossAxios(): AxiosInstance {
    return this._tossAxios;
  }

  getSecretKey = (): string => {
    const secretKey = process.env.TOSS_SECRET_KEY;
    if (secretKey === undefined || isEmpty(secretKey)) {
      throw new Error("Toss Secret Key is Empty");
    }
    return secretKey;
  };

  getClientId = (): string => {
    const clientId = process.env.TOSS_CLIENT_ID;
    if (clientId === undefined || isEmpty(clientId)) {
      throw new Error("Toss Client Id is Empty");
    }
    return clientId;
  };
}

export interface TossApproveParam {
  orderId: string;
  amount: number;
}
