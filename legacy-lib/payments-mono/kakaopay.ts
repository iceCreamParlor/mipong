import axios, { AxiosInstance } from "axios";
import { URLSearchParams } from "url";
import {
  getSecret,
  PaymentParam,
  PaymentSerivce,
  PaymentType,
  withPaymentResponse,
} from "../misc/payment";

class KakaoPayService implements PaymentSerivce {
  private _kakaoPayAxios: AxiosInstance;
  private _adminKey: string;
  private _onetimeCid: string;
  private _subscriptionCid: string;
  private _pg: PaymentType = "kakaopay";
  private static instance: KakaoPayService | undefined = undefined;

  public static getInstance() {
    if (this.instance === undefined) {
      this.instance = KakaoPayService.BUILD();
    }
    return this.instance;
  }

  public static BUILD(
    adminKey?: string,
    onetimeCid?: string,
    subscriptionCid?: string
  ): KakaoPayService {
    const { kakaopay } = getSecret();
    adminKey = adminKey ?? kakaopay.adminKey;
    onetimeCid = onetimeCid ?? kakaopay.onetimeCid;
    subscriptionCid = subscriptionCid ?? kakaopay.subscriptionCid;

    if (
      adminKey === undefined ||
      onetimeCid === undefined ||
      subscriptionCid === undefined
    ) {
      throw new Error("(KAKAOPAY) Invalid Api Key");
    }

    return new KakaoPayService(adminKey, onetimeCid, subscriptionCid);
  }

  constructor(adminKey: string, onetimeCid: string, subscriptionCid: string) {
    this._adminKey = adminKey;
    this._onetimeCid = onetimeCid;
    this._subscriptionCid = subscriptionCid;

    this._kakaoPayAxios = axios.create({
      baseURL: "https://kapi.kakao.com",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `KakaoAK ${adminKey}`,
      },
    });

    if (
      !this._adminKey ||
      !this._onetimeCid ||
      !this._subscriptionCid ||
      !this._kakaoPayAxios
    ) {
      throw new Error("카카오페이 생성자 실행 제대로 안됨");
    }
  }

  /**
   * 1회구매, 정기구매 거래를 준비한다.
   * @param readyParam
   * @param paymentType
   * @returns
   */
  async ready(
    readyParam: ReadyParam,
    paymentType: "onetime" | "subscription"
  ): Promise<KakaoPayResponse<ReadyResponse>> {
    const params = this.convertUrlEncodedParam(readyParam);

    if (paymentType === "onetime") {
      params.append("cid", this._onetimeCid);
    } else if (paymentType === "subscription") {
      params.append("cid", this._subscriptionCid);
    }

    return withPaymentResponse(this._pg, async () =>
      this._kakaoPayAxios.post("/v1/payment/ready", params)
    );
  }

  async registerSubscription(
    param: ReadyParam
  ): Promise<KakaoPayResponse<ReadyResponse>> {
    return this.ready(param, "subscription");
  }
  async approveOnetime(
    approveParam: ApproveParam
  ): Promise<KakaoPayResponse<ApproveResponse>> {
    return this.approve(approveParam, "onetime");
  }
  async approveSubscription(
    approveParam: ApproveParam
  ): Promise<KakaoPayResponse<ApproveResponse>> {
    return this.approve(approveParam, "subscription");
  }

  /**
   * 1회구매, 정기구매 승인
   *
   * @param approveParam
   * @param paymentType
   * @returns
   */
  async approve(
    approveParam: ApproveParam,
    paymentType: "onetime" | "subscription"
  ): Promise<KakaoPayResponse<ApproveResponse>> {
    const params = this.convertUrlEncodedParam(approveParam);

    if (paymentType === "onetime") {
      params.append("cid", this._onetimeCid);
    } else if (paymentType === "subscription") {
      params.append("cid", this._subscriptionCid);
    }

    return withPaymentResponse(this._pg, async () =>
      this._kakaoPayAxios.post("/v1/payment/approve", params)
    );
  }
  /**
   * 카카오페이 정기구매 비활성화
   * 요청 시 지정된 SID 를 비활성화하여 다시 사용할 수 없도록 합니다.
   * @param inactivateSubscriptionParam
   * @returns
   */
  async inactivateSubscription(
    inactivateSubscriptionParam: InactivateSubscriptionParam
  ): Promise<KakaoPayResponse<InactivateSubscriptionResponse>> {
    const params = this.convertUrlEncodedParam(inactivateSubscriptionParam);
    params.append("cid", this._subscriptionCid);

    return withPaymentResponse(this._pg, async () =>
      this._kakaoPayAxios.post(
        "/v1/payment/manage/subscription/inactive",
        params
      )
    );
  }
  /**
   * 결제 취소
   * 결제 고유번호인 tid에 해당하는 결제건에 대해 지정한 금액만큼 결제 취소를 요청합니다.ㅌ
   * @param cancelParam
   * @returns
   */
  async cancelPayment(
    cancelParam: CancelParam
  ): Promise<KakaoPayResponse<CancelResponse>> {
    const params = this.convertUrlEncodedParam(cancelParam);
    params.append("cid", this._subscriptionCid);

    return withPaymentResponse(this._pg, async () =>
      this._kakaoPayAxios.post("/v1/payment/cancel", params)
    );
  }
  /**
   * 정기 결제 상태 조회
   * 정기 결제 고유번호인 SID의 상태 확인을 위해 호출합니다. SID 상태는 '활성화(ACITVE)'와 '비활성화(INACTIVE)' 2가지 값을 제공합니다.
   * SID가 활성 상태여야만 다음 결제 시 사용할 수 있습니다. 정기 결제를 중단해 비활성 상태로 바뀐 SID도 상태를 조회할 수 있습니다.
   * 앱 어드민 키를 헤더에 담아 POST로 요청합니다.
   * @param getSubscriptionParam
   * @returns
   */
  async getSubscription(
    getSubscriptionParam: GetSubscriptionStatusParam
  ): Promise<KakaoPayResponse<GetSubscriptionStatusResponse>> {
    const params = this.convertUrlEncodedParam(getSubscriptionParam);
    params.append("cid", this._subscriptionCid);

    return withPaymentResponse(this._pg, async () =>
      this._kakaoPayAxios.post("/v1/payment/manage/subscription/status", params)
    );
  }
  /**
   * 주문 조회
   * 개별 주문의 상세정보를 조회
   * @param getPaymentParam
   * @returns
   */
  async getPayment(
    getPaymentParam: GetPaymentParam
  ): Promise<KakaoPayResponse<GetPaymentResponse>> {
    const params = this.convertUrlEncodedParam(getPaymentParam);
    params.append("cid", this._subscriptionCid);
    return withPaymentResponse(this._pg, async () =>
      this._kakaoPayAxios.post("/v1/payment/order", params)
    );
  }

  private convertUrlEncodedParam(param: any): URLSearchParams {
    let params = new URLSearchParams();
    Object.keys(param).forEach((p) => {
      params.append(p, param[p]);
    });
    return params;
  }
}

export interface CancelParam extends PaymentParam {
  // 결제 고유번호
  tid: string;
  // 취소 금액
  cancel_amount: number;
  // 취소 비과세 금액
  cancel_tax_free_amount: number;
  // 취소 부과세 금액, 디폴트 : (취소 금액 - 취소 비과세 금액)/11, 소숫점이하 반올림)
  cancel_vat_amount?: number;
  // 취소 가능 금액(결제 취소 요청 금액 포함)
  cancel_available_amount?: number;
  // 해당 요청에 대해 저장하고 싶은 값, 최대 200자
  payload?: string;
}
export interface CancelResponse {
  // 요청 고유 번호
  aid: string;
  // 결제 고유 번호, 10자
  tid: string;
  // 가맹점 코드, 20자
  cid: string;
  // 결제 상태
  status: PaymentStatus;
  // 가맹점 주문번호, 최대 100자
  partner_order_id: string;
  // 가맹점 회원 id, 최대 100자
  partner_user_id: string;
  // 결제 수단, CARD 또는 MONEY 중 하나
  payment_method_type: string;
  // 결제 금액 정보
  amount: Amount;
  // 이번 요청으로 취소된 금액
  approved_cancel_amount: ApprovedCancelAmount;
  // 누계 취소 금액
  canceled_amount: CanceledAmount;
  // 남은 취소 가능 금액
  cancel_available_amount: CancelAvailableAmount;
  // 상품 이름, 최대 100자
  item_name: string;
  // 상품 코드, 최대 100자
  item_code: string;
  // 상품 수량
  quantity: number;
  // 결제 준비 요청 시각
  created_at: string;
  // 결제 승인 시각
  approved_at: string;
  // 결제 취소 시각
  canceled_at: string;
  // 취소 요청 시 전달한 값
  payload: string;
}

export interface GetPaymentParam extends PaymentParam {
  // 결제 고유 번호
  tid: string;
}
export interface GetPaymentResponse {
  // 결제 고유 번호
  tid: string;
  // 가맹점 코드
  cid: string;
  // 결제 상태
  status: PaymentStatus;
  // 가맹점 주문번호
  partner_order_id: string;
  // 가맹점 회원 아이디
  partner_user_id: string;
  // 결제 수단, CARD 또는 MONEY 중 하나
  payment_method_type: string;
  // 결제 금액
  amount: Amount;
  // 취소된 금액
  canceled_amount: CanceledAmount;
  // 취소 가능 금액
  cancel_available_amount: CancelAvailableAmount;
  // 상품 이름, 최대 100자
  item_name: string;
  // 상품 코드, 최대 100자
  item_code: string;
  // 상품 수량
  quantity: number;
  // 결제 준비 요청 시각
  created_at: string;
  // 결제 승인 시각
  approved_at: string;
  // 결제 취소 시각
  canceled_at: string;
  // 결제 카드 정보
  selected_card_info: SelectedCardInfo;
  // 결제/취소 상세
  payment_action_details: PaymentActionDetails[];
}
export interface GetSubscriptionStatusParam {
  // 정기결제 ID
  sid: string;
}
export interface GetSubscriptionStatusResponse {
  // 사용 가능 여부
  available: boolean;
  // 가맹점 코드, 10자
  cid: string;
  // 정기 결제 고유 번호, 20자
  sid: string;
  // 정기 결제 상태, ACTIVE(활성) 또는 INACTIVE(비활성) 중 하나
  status: string;
  // 결제 수단, CARD 또는 MONEY 중 하나
  payment_method_type: string;
  // 상품 이름. 최대 100자
  item_name: string;
  // SID 발급 시각
  created_at: string;
  // 마지막 결제 승인 시각
  last_approved_at: string;
  // 정기결제 비활성화 시각
  inactivated_at: string;
}
export interface InactivateSubscriptionParam extends PaymentParam {
  // 정기 결제 고유번호, 20자
  sid: string;
}
export interface InactivateSubscriptionResponse {
  // 정기 결제 고유번호, 20자
  sid: string;
  // 정기 결제 상태, ACTIVE(활성) 또는 INACTIVE(비활성) 중 하나
  status: "ACTIVE" | "INACTIVE";
  // SID 발급 시각
  created_at: string;
  // 마지막 결제승인 시각
  last_approved_at: string;
  // 정기결제 비활성화 시각
  inactivated_at: string;
}
export interface ApproveParam extends PaymentParam {
  // 결제 고유번호, 결제 준비 API 응답에 포함
  tid: string;
  // 가맹점 주문번호, 결제 준비 API  요청과 일치해야 함
  partner_order_id: string;
  // 가맹점 회원 id, 결제 준비 API 요청과 일치해야 함
  partner_user_id: string;
  // 결제 승인 요청을 인증하는 토큰.
  // 사용자 결제 수단 선택 완료 시, approval_url로 redirection해줄 때 pg_token을 query string으로 전달
  pg_token: string;
  // 결제 승인 요청에 대해 저장하고 싶은 값, 최대 200자
  payload?: string;
  // 상품 총액, 결제 준비 API 요청과 일치해야 함
  total_amount?: number;
}
export interface ReadyParam {
  // 가맹점 주문번호, 최대 100자
  partner_order_id: string;
  // 가맹점 회원id, 최대 100자
  partner_user_id: string;
  // 상품명, 최대 100자
  item_name: string;
  // 상품 수량
  quantity: number;
  // 상품 총액
  total_amount: number;
  // 상품 비과세 금액
  tax_free_amount: number;
  // 상품 부가세 금액  (상품총액 - 상품 비과세 금액)/11, 소수점 이하 반올림
  vat_amount?: number;
  // 결제 성공 시 redirect url, 최대 255자
  approval_url: string;
  // 결제 취소 시 redirect url, 최대 255자
  cancel_url: string;
  // 결제 실패 시 redirect url, 최대 255자
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

export interface ReadyResponse {
  // 결제 고유 번호, 20자
  tid: string;
  // 요청한 클라이언트(Client)가 모바일 앱일 경우 카카오톡 결제 페이지 Redirect URL
  next_redirect_app_url: string;
  // 요청한 클라이언트가 모바일 웹일 경우 카카오톡 결제 페이지 Redirect URL
  next_redirect_mobile_url: string;
  // 요청한 클라이언트가 PC 웹일 경우 카카오톡으로 결제 요청 메시지(TMS)를 보내기 위한 사용자 정보 입력 화면 Redirect URL
  next_redirect_pc_url: string;
  // 카카오페이 결제 화면으로 이동하는 Android 앱 스킴(Scheme)
  android_app_scheme: string;
  // 카카오페이 결제 화면으로 이동하는 iOS 앱 스킴
  ios_app_scheme: string;
  // 결제 준비 요청 시간
  created_at: string;
}
export interface ApproveResponse {
  // 요청 고유 번호
  aid: string;
  // 결제 고유 번호
  tid: string;
  // 가맹점 코드
  cid: string;
  // 정기결제용 아이디, 정기결제 CID 로 단건결제 요청 시 발급
  sid: string;
  // 가맹점 주문번호, 최대 100자
  partner_order_id: string;
  // 가맹점 회원 id, 최대 100자
  partner_user_id: string;
  // 결제 수단
  payment_method_type: "CARD" | "MONEY";
  // 상품 이름, 최대 100자
  item_name: string;
  // 상품 코드, 최대 100자
  item_code: string;
  // 상품 수량
  quantity: number;
  // 결제 금액 정보
  amount: Amount;
  // 결제 상세 정보, 결제수단이 카드일 경우만 포함
  card_info?: CardInfo;
  // 결제 준비 요청 시각
  created_at: string;
  // 결제 승인 시각
  approved_at: string;
  // 결제 승인 요청에 대해 저장한 값, 요청 시 전달된 내용
  payload: string;
}
export interface ApproveSubscriptionParam {
  // 정기결제 키, 20자. 1회차 정기 결제 시 응답으로 받았던 SID
  sid: string;
  // 가맹점 주문번호, 최대 100자
  partner_order_id: string;
  // 가맹점 회원 아이디, 최대 100자. SID를 발급 받은 첫 결제의 결제 준비 API 로 전달한 값과 일치해야 함
  partner_user_id: string;
  // 상품명, 최대 100자
  item_name?: string;
  // 상품코드, 최대 100자
  item_code?: string;
  // 상품 수량
  quantity: number;
  // 상품 총액
  total_amount: number;
  // 상품 비과세 금액
  tax_free_amount: number;
  // 상품 부가세 금액 [기본값 : (상품총액 - 상품 비과세 금액)/11 . 소수점 이하 반올림]
  vat_amount?: number;
  // 결제 승인 요청에 대해 저장하고 싶은 값, 최대 200자
  payload?: string;
}
export interface ApproveSubscriptionResponse {
  // Request 고유 번호
  aid: string;
  // 결제 고유 번호
  tid: string;
  // 가맹점 코드
  cid: string;
  // 정기(배치)결제 고유 번호. 20자
  sid: string;
  // 가맹점 주문번호
  partner_order_id: string;
  // 가맹점 회원 id
  partner_user_id: string;
  // 결제 수단, CARD 또는 MONEY 중 하나
  payment_method_type: string;
  // 결제 금액 정보
  amount: Amount;
  // 결제 상세 정보, 결제수단이 카드일 경우만 포함
  card_info?: CardInfo;
  // 상품 이름, 최대 100자
  item_name: string;
  // 상품 코드, 최대 100자
  item_code: string;
  // 상품 수량
  quantity: number;
  // 결제 준비 요청 시각
  created_at: string;
  // 결제 승인 시각
  approved_at: string;
  // 결제 요청 시 전달했던 값
  payload: string;
}
export interface KakaoPaySuccess<T> {
  success: true;
  statusCode: number;
  pg: "kakaopay";
  data: T;
}
export interface KakaoPayFail {
  success: false;
  statusCode: number;
  pg: "kakaopay";
  data: {
    code: number;
    msg: string;
  };
}
type KakaoPayResponse<T> = KakaoPaySuccess<T> | KakaoPayFail;

interface Amount {
  // 전체 결제 금액
  total: number;
  // 비과세 금액
  tax_free: number;
  // 부가세 금액
  vat: number;
  // 사용한 포인트 금액
  point: number;
  // 할인 금액
  discount: number;
}
interface CardInfo {
  // 카드사 승인번호
  approved_id: string;
  // 카드 BIN
  bin: string;
  // 카드사 가맹점 번호
  card_mid: string;
  // 카드 타입
  card_type: string;
  // 카드 상품 코드
  card_item_code: string;
  // 할부 개월 수
  install_month: string;
  // 카카오페이 매입사명
  kakaopay_purchase_corp: string;
  // 카카오페이 매입사코드
  kakaopay_purchase_corp_code: string;
  // 카카오페이 발급사명
  kakaopay_issuer_corp: string;
  // 카카오페이 발급사 코드
  kakaopay_issuer_corp_code: string;
  // 다음의 항목은 첫 정기결제 0원 결제일 경우에는 포함되지 않는다.
  issuer_corp?: string;
  // 카드 발급사 코드
  issuer_corp_code?: string;
  // 매입 카드사 한글명
  purchase_corp?: string;
  // 매입 카드사 코드
  purchase_corp_code?: string;
  // 무이자할부 여부(Y/N)
  interest_free_install?: string;
}
interface CanceledAmount {
  // 전체 취소 금액
  total: number;
  // 취소된 비과세 금액
  tax_free: number;
  // 취소된 부가세 금액
  vat: number;
  // 취소된 포인트 금액
  point: number;
  // 취소된 할인 금액
  discount: number;
}
interface CancelAvailableAmount {
  // 전체 취소 가능 금액
  total: number;
  // 취소 가능한 비과세 금액
  tax_free: number;
  // 취소 가능한 부가세 금액
  vat: number;
  // 취소 가능한 포인트 금액
  point: number;
  // 취소 가능한 할인 금액
  discount: number;
}
interface SelectedCardInfo {
  // 카드 BIN
  card_bin: string;
  // 할부 개월 수
  install_month: number;
  // 카드사 정보
  card_corp_name: string;
  // 무이자할부 여부 (Y/N)
  interest_free_install: string;
}
interface PaymentActionDetails {
  // Request 고유 번호
  aid: string;
  // 거래시간
  approved_at: string;
  // 결제/취소 총액
  amount: number;
  // 결제/취소 포인트 금액
  point_amount: number;
  // 할인 금액
  discount_amoount: number;
  // 결제 타입
  payment_action_type: "PAYMENT" | "CANCEL" | "ISSUED_SID";
  // Request 로 전달한 값
  payload: string;
}
interface ApprovedCancelAmount {
  // 이번 요청으로 취소된 전체 금액
  total: number;
  // 이번 요청으로 취소된 비과세 금액
  tax_free: number;
  // 이번 요청으로 취소된 부가세 금액
  vat: number;
  // 이번 요청으로 취소된 포인트 금액
  point: number;
  // 이번 요청으로 취소된 할인 금액
  discount: number;
}
type PaymentStatus =
  // 결제 요청
  | "READY"
  // 결제 요청 메시지(TMS) 발송 완료
  | "SEND_TMS"
  // 사용자가 카카오페이 결제 화면 진입
  | "OPEN_PAYMENT"
  // 결제 수단 선택, 인증 완료
  | "SELECT_METHOD"
  // ARS 인증 진행 중
  | "ARS_WAITING"
  // 비밀번호 인증 완료
  | "AUTH_PASSWORD"
  // SID 발급 완료, 정기 결제 시 SID 만 발급 한 경우
  | "ISSUED_SID"
  // 결제 완료
  | "SUCCESS_PAYMENT"
  // 부분 취소
  | "PART_CANCEL_PAYMENT"
  // 결제된 금액 모두 취소, 부분 취소 여러 번으로 모두 취소된 경우 포함
  | "CANCEL_PAYMENT"
  // 사용자 비밀번호 인증 실패
  | "FAIL_AUTH_PASSWORD"
  // 사용자가 결제 중단
  | "QUIT_PAYMENT"
  // 결제 승인 실패
  | "FAIL_PAYMENT";
