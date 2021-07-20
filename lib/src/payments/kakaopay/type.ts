export interface KakaoPayFailResponse {
  code: number;
  msg: string;
  extras: {
    method_result_code: string;
    method_result_message: string;
  };
}
export interface KakaoPayApproveResponse {
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
