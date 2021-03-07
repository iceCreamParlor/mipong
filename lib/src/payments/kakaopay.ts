import axios, { AxiosInstance } from "axios";
import { isEmpty } from "../misc/string";

export class KakaoPayService {
  private _kakaoPayAxios: AxiosInstance;

  constructor(private adminKey?: string, private cid?: string) {
    if (adminKey === undefined || isEmpty(adminKey)) {
      adminKey = this.getAdminKey();
    }
    if (cid === undefined || isEmpty(cid)) {
      cid = this.getCid();
    }

    this._kakaoPayAxios = axios.create({
      baseURL: "https://kapi.kakao.com",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `KakaoAK ${adminKey}`,
      },
    });

    if (!adminKey || !cid || !this._kakaoPayAxios) {
      throw new Error("카카오페이 생성자 실행 에러 발생");
    }
  }

  async readySinglePayment(readyParam: ReadySinglePaymentParam) {
    let params = new URLSearchParams();

    Object.keys(readyParam).forEach((p) => {
      params.append(
        p,
        readyParam[p as keyof ReadySinglePaymentParam] as string
      );
    });

    if (!Object.keys(readyParam).includes("cid")) {
      params.append("cid", this.getCid());
    }
    console.log(`param: ${params}`);

    const axiosResponse = await this._kakaoPayAxios
      .post("/v1/payment/ready", params)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));

    console.log(
      `Ready Single Payment Response : ${JSON.stringify(axiosResponse)}`
    );
    return axiosResponse;
  }

  /**
   * 카카오페이 Admin Key 를 환경 변수에서 뽑아온다.
   * @returns
   */
  getAdminKey = (): string => {
    const adminKey = process.env.KAKAOPAY_ADMIN_KEY;
    if (adminKey === undefined || isEmpty(adminKey)) {
      throw new Error("Kakao Admin Key is Empty");
    }
    return adminKey;
  };
  /**
   * 카카오페이 CID 를 환경 변수에서 뽑아온다.
   * @returns
   */
  getCid = (): string => {
    const cid = process.env.KAKAOPAY_CID;
    if (cid === undefined || isEmpty(cid)) {
      throw new Error("KakaoPay CID Key is Empty");
    }
    return cid;
  };

  get kakaoPayAxios(): AxiosInstance {
    return this._kakaoPayAxios;
  }
}

export default KakaoPayService;

export interface ReadySinglePaymentParam {
  cid?: string;
  cid_secret?: string;
  partner_order_id: string;
  partner_user_id: string;
  item_name: string;
  quantity: number;
  total_amount: number;
  tax_free_amount: number;
  vat_amount?: number;
  approval_url: string;
  cancel_url: string;
  fail_url: string;
  // ["HANA", "BC"]
  available_cards?: string[];
  // CARD, MONEY
  payment_method_type?: string;
  // 0 ~ 12
  installMonth?: number;
  /**
   * ex) iOS에서 사용자 인증 완료 후 가맹점 앱으로 자동 전환하는 방법(iOS만 예외 처리, 안드로이드 동작 안 함)
    - 다음과 같이 return_custom_url key 정보에 앱스킴을 넣어서 전송
    "return_custom_url":"kakaotalk://"
   */
  customJson?: object;
}
