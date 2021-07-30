export enum NicePayAPI {
  RegisterSubscription,
  ApproveSubscription,
  CancelPayment,
  InactivateSubscription,
}
export const NicePaySuccessCode: { [key in NicePayAPI]: string } = {
  [NicePayAPI.RegisterSubscription]: "F100",
  [NicePayAPI.InactivateSubscription]: "F101",
  [NicePayAPI.ApproveSubscription]: "3001",
  [NicePayAPI.CancelPayment]: "2001",
};
export interface NicePayResponse {
  ResultCode: string;
  ResultMsg: string;
}

export interface NicePayRegisterSubscriptionParam {
  BuyerName: string;
  BuyerEmail: string;
  BuyerTel: string;
  CharSet?: string;
  CardNo: string;
  ExpYear: string;
  ExpMonth: string;
  IDNo: string;
  CardPw: string;
  MID?: string;
  EdiDate?: string;
  Moid?: string;
  EncData?: string;
  SignData?: string;
  /*! 응답전문 유형 (default(미설정): JSON / KV(설정): Key=Value형식 응답) */
  EdiType?: string;
}
export interface NicePayRegisterSubscriptionResponse {
  /*! 결과 코드 (F100 : 성공 / 그외 실패) */
  ResultCode: string;
  ResultMsg: string;
  TID: string;
  /*! 빌키, 가맹점 DB 저장하여, 승인 요청 시 전달 */
  BID: string;
  /*! 인증일자 (YYYYMMDD) */
  AuthDate: string;
  CardNo: string;
  /*! 카드사 코드 */
  CardCode: string;
  CardName: string;
  /*! 체크카드 여부 (0: 신용카드 / 1: 체크카드) */
  CardCl: string;
  /*! 매입카드사코드 */
  AcquCardCode: string;
  /*! 매입카드사명 */
  AcquCardName: string;
}
export interface NicePayApproveSubscriptionParam {
  /*! 빌링키 */
  BID: string;
  /*! 상점 ID */
  MID?: string;
  TID?: string;
  EdiDate?: string;
  /*! 상점에서 부여한 주문번호 OrderCID */
  Moid: string;
  Amt: string;
  /*! 상품명 "|"(파이프라인) 특수기호는 당사 응답전문의 구분값으로 사용을 금지하며 이외 특수기호 사용 시 영업담당자 협의 필요 */
  GoodsName: string;
  /*! 위변조 검증 Data, Hex(SHA256(MID + EdiDate + Moid + Amt + BID + 상점키)) */
  SignData?: string;
  /*! 가맹점 분담 무이자 사용 여부 (0: 사용안함_이자 / 1: 사용_무이자) */
  CardInterest: string;
  /*! 할부개월 (00: 일시불 /02:2개월 /03:3개월 ...) */
  CardQuota: string;
  /*! 카드사 포인트 사용 여부 (0(default): 미사용 / 1: 사용) */
  CardPoint?: string;
  BuyerName: string;
  BuyerEmail: string;
  /*! 구매자 전화번호, ‘-‘ 없이 숫자만 입력 */
  BuyerTel: string;
  /*! 별도공급가액설정시사용 */
  SupplyAmt?: string;
  /*! 별도부가세설정시사용 */
  GoodsVat?: string;
  /*! 별도봉사료설정시사용 */
  ServiceAmt?: string;
  /*! 별도면세금액설정시사용 */
  TaxFreeAmt?: string;
  /*! 응답파라미터 인코딩 방식 (utf-8 / euc-kr(default)) */
  CharSet?: string;
  /*! 응답전문 유형 (default(미설정): JSON / KV(설정): Key=Value형식 응답) */
  EdiType?: string;
  /*! 상점 정보 전달용 여분필드 (Nicepay 가공없음) */
  MallReserved?: string;
}
export interface NicePayApproveSubscriptionResponse {
  /*! 성공: 3001 그외 실패 */
  ResultCode: string;
  ResultMsg: string;
  TID: string;
  Moid: string;
  Amt: string;
  /*! 승인번호 */
  AuthCode: string;
  AuthDate: string;
  /*! 매입카드사코드 */
  AcquCardCode: string;
  /*! 매입카드사명 */
  AcquCardName: string;
  CardNo: string;
  CardCode: string;
  CardName: string;
  CardQuota: string;
  /*! 카드타입 / 결제 성공인 경우에만 리턴 (0: 신용카드 / 1: 체크카드) */
  CardCl: string;
  /*! 무이자 여부 (0: 이자 / 1: 무이자) */
  CardInterest: string;
  /*! 부분취소 가능여부 (0: 불가능 / 1: 가능) */
  CcPartCl: string;
  MallReserved: string;
}
export interface NicePayCancelPaymentParam {
  /*! 거래 ID */
  TID: string;
  /*! 상점 ID */
  MID?: string;
  /*! 주문번호 (부분 취소 시 중복취소 방지를 위해 설정) */
  Moid: string;
  CancelAmt: string;
  /*! 취소사유 (euc-kr) */
  CancelMsg: string;
  /*! 0:전체 취소, 1:부분 취소 */
  PartialCancelCode: string;
  /*! 요청 시간 (YYYYMMDDHHMMSS) */
  EdiDate?: string;
  /*! hex(sha256(MID + CancelAmt + EdiDate + MerchantKey)) */
  SignData?: string;
  SupplyAmt?: string;
  GoodsVat?: string;
  ServiceAmt?: string;
  TaxFreeAmt?: string;
  /*! 인증 응답 인코딩 (euc-kr / utf-8) */
  CharSet?: string;
  /*! 장바구니 결제 유형 (장바구니 결제:1/ 그 외:0) */
  CartType: string;
  /*! 응답전문 유형 (JSON / KV) *KV:Key=value */
  EdiType?: string;
  MallReserved?: string;
}
export interface NicePayCancelPaymentResponse {
  /*! 2001: 취소 성공 */
  ResultCode: string;
  ResultMsg: string;
  ErrorCD: string;
  ErrorMsg: string;
  CancelAmt: string;
  MID?: string;
  Signature: string;
  PayMethod: string;
  TID: string;
  CancelDate: string;
  CancelTime: string;
  CancelNum: string;
  RemainAmt: string;
  MallReserved: string;
}
export interface NicePayInactivateSubscriptionParam {
  BID: string;
  MID?: string;
  EdiDate: string;
  Moid: string;
  SignData?: string;
  CharSet?: string;
}

export interface NicePayInactivateSubscriptionResponse {
  ResultCode: string;
  ResultMsg: string;
  TID: string;
  BID: string;
  AuthDate: string;
}
export interface NicePaySetEscrowParam {
  TID: string;
  MID?: string;
  ReqType: string;
  EdiDate: string;
  MallIp?: string;
  CharSet?: "utf-8" | "euc-kr";
  SignData?: string;
  EdiType: "JSON" | "KV";
  DeliveryCoNm: string;
  BuyerAddr: string;
  InvoiceNum: string;
  RegisterName: string;
  /*! 구매결정 메일발송 여부 (1:발송, 2:미발송) */
  ConfirmMail: "1" | "2";
}
export interface NicePaySetEscrowResponse {
  ResultCode: string;
  ResultMsg: string;
  ProcessDate: string;
  ProcessTime: string;
}
