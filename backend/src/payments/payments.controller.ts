import { Controller, Get, Inject, Post, Query, Req } from '@nestjs/common';
import { KakaoPayService } from '../lib/payments/kakaopay';

@Controller('payments')
export class PaymentsController {
  private baseUrl = 'http://localhost:8080';
  private tid = '';

  constructor(private kakaoPayService: KakaoPayService) {
    kakaoPayService = new KakaoPayService();
  }

  @Post('/kakao/ready')
  readyKakao(): object {
    const readyResponse = this.kakaoPayService.readySinglePayment({
      partner_order_id: '10000',
      partner_user_id: '698500',
      item_name: '면도기',
      quantity: 1,
      total_amount: 8900,
      tax_free_amount: 0,
      approval_url: `${this.baseUrl}/api/payments/kakao/approve`,
      cancel_url: `${this.baseUrl}/api/payments/kakao/cancel`,
      fail_url: `${this.baseUrl}/api/payments/kakao/fail`,
    });

    return readyResponse;
  }

  @Get('/kakao/approve')
  approveKakao(@Query() query): object {
    console.log(`pgToken : ${query.pg_token}`);
    console.log(`ordercid : ${query.ordercid}`);
    const approveResponse = this.kakaoPayService.approveSinglePayment({
      pg_token: query.pg_token,
      partner_order_id: '10000',
      partner_user_id: '698500',
      tid: this.tid,
    });

    return approveResponse;
  }

  @Get('/kakao/setTid')
  setTid(@Query() query) {
    console.log(query);
    this.tid = query.tid;
    console.log(`tid: ${this.tid}`);
  }
}
