export interface NaverPayFailResponse {
  code: NaverpayFailCode;
  message: string;
}
// 네이버페이는 성공시에만 code 에 "Success" 가 오고 실패시에는 code 에 실패코드가 넘어옴.
type NaverpayFailCode =
  | "Fail"
  | "InvalidMerchant"
  | "TimeExpired"
  | "AlreadyOnGoing"
  | "AlreadyComplete"
  | "OwnerAuthFail";
