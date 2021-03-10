import { Controller, Get, Inject, Post, Query, Req } from '@nestjs/common';
import { KakaoPayService } from '../lib/payments/kakaopay';
import { TossService } from '../lib/payments/toss';

@Controller('payments')
export class PaymentsController {
  private baseUrl = 'http://localhost:8080';
  private tid = '';

  constructor(
    private kakaoPayService: KakaoPayService,
    private tossService: TossService,
  ) {
    kakaoPayService = new KakaoPayService();
    tossService = new TossService();
  }

  @Post('/kakao/ready')
  readyKakao(): any {
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
  approveKakao(@Query() query): any {
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

  @Get('/toss/onetime/success')
  async approveTossOnetime(@Query() query): Promise<any> {
    const paymentKey = query.paymentKey;
    const orderId = query.orderId;
    const amount = query.amount;

    console.log(
      `paymentKey: ${paymentKey}, orderId: ${orderId}, amount: ${amount}`,
    );

    const approveParam = {
      paymentKey,
      orderId,
      amount,
    };

    const result = await this.tossService.approveOneTime(
      approveParam,
    );
    console.log(result);

    return result;
  }
}
