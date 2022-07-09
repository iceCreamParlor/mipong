export interface HttpResponse {
  url: string;
  body: string;
  header: ResponseHeader[];
  code: number; // 응답 코드
  isRedirect?: boolean; // 리다이렉트 됐는지 여부
}

export interface ResponseHeader {
  [key: string]: string;
}
