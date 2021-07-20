import { Payment } from ".";
import { KakaoPayApproveResponse, KakaoPayFailResponse } from "./kakaopay/type";
import { NaverPayFailResponse } from "./naverpay/type";
import { TossPayBillingKeyStatus, TossPayPayMethod } from "./tosspay/type";

export type ApproveOnetimeParam = {
  [Payment.IAMPORT]: {
    impUid: string;
  };
  [Payment.NICEPAY]: {
    orderId: string;
    cardNo: string;
    expDate: string;
    dob: string;
    cardPwd: string;
  };
  [Payment.TOSS]: {
    paymentKey: string;
    orderId: string;
    amount: number;
  };
  [Payment.KAKAOPAY]: {
    orderCid: string;
    pgToken: string;
  };
  [Payment.NAVERPAY]: {
    paymentId: string;
  };
  [Payment.TOSSPAY]: {
    payToken: string;
    orderNo: string;
  };
};
export type ApproveOnetimeResponse = {
  [Payment.IAMPORT]: {};
  [Payment.NICEPAY]: {};
  [Payment.TOSS]: {};
  [Payment.KAKAOPAY]: KakaoPayApproveResponse | KakaoPayFailResponse;
  [Payment.NAVERPAY]: {};
  [Payment.TOSSPAY]: {};
};

export type InactivateBillingKeyParam = {
  [Payment.KAKAOPAY]: {
    sid: string;
  };
  [Payment.NAVERPAY]: {
    // 해지할 정기/반복결제 등록 번호
    recurrentId: string;
    // 해지 요청자(1: 구매자, 2: 가맹점 관리자) 구분하기 어려우면 가맹점 관리자로 입력합니다
    expireRequester: string;
    expireReason: string;
  };
  [Payment.TOSSPAY]: {
    billingKey: string;
  };
};
export type InactivateBillingKeyResponse = {
  [Payment.KAKAOPAY]:
    | {
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
    | KakaoPayFailResponse;
  [Payment.NAVERPAY]:
    | {
        code: "Success";
        message: string;
        body: {
          recurrentId: string;
        };
      }
    | NaverPayFailResponse;
  [Payment.TOSSPAY]: {};
};
export type BillingKeyCheckParam = {
  [Payment.KAKAOPAY]: {
    // 가맹점 코드 인증키, 24자, 숫자+영문 소문자 조합
    cid_secret?: string;
    // 정기 결제 고유번호. 20자
    sid: string;
  };
  [Payment.NAVERPAY]: {
    recurrentId: string;
    // VALID: 유효, EXPIRED: 만료, ALL: 전체값이 없으면 ALL로 간주합니다
    state?: "VALID" | "EXPIRED" | "ALL";
  };
  [Payment.TOSSPAY]: {
    userId: string;
    displayId: string;
  };
};
export type BillingKeyCheckResponse = {
  [Payment.KAKAOPAY]:
    | {
        available: boolean;
        cid: string;
        sid: string;
        status: "ACTIVE" | "INACTIVE";
        payment_method_type: "CARD" | "MONEY";
        item_name: string;
        created_at: string;
        last_approved_at: string;
        inactivated_at: string;
      }
    | KakaoPayFailResponse;
  [Payment.NAVERPAY]: {
    code: "Success";
    message: string;
    body:
      | {
          list: [
            {
              recurrentId: string;
              productCode: string;
              naverPointUse: string;
              primaryPayMeans: string;
              primaryPayMeansCorpCd: string;
              primaryPayMeansNo: string;
              recurrentState: string;
              registYmdt: string;
              expireYmdt: string;
            }
          ];
          totalCount: number;
          responseCount: number;
          totalPageCount: number;
          currentPageNumber: number;
        }
      | NaverPayFailResponse;
  };
  [Payment.TOSSPAY]:
    | {
        code: 0;
        status: TossPayBillingKeyStatus;
        userId: string;
        displayId: string;
        billingKey: string;
        payMethod: TossPayPayMethod;
        cardCompanyNo?: string;
        cardCompanyName?: string;
        accountBankCode?: string;
        accountBankName?: string;
      }
    | TossPayFail;
};
