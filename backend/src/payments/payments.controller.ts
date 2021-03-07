import { Controller, Get } from '@nestjs/common';
import { KakaoPayService } from '../lib/payments/kakaopay';

@Controller('payments')
export class PaymentsController {
  private baseUrl = 'http://localhost:8080';
  constructor(private kakaoPayService: KakaoPayService) {
    kakaoPayService = new KakaoPayService();
  }

  @Get('/kakao/ready')
  readyKakao(): object {
    const readyResponse = this.kakaoPayService.readySinglePayment({
      partner_order_id: '10000',
      partner_user_id: '698500',
      item_name: '면도기',
      quantity: 1,
      total_amount: 8900,
      tax_free_amount: 0,
      approval_url: `${this.baseUrl}/payments/kakao/approve`,
      cancel_url: `${this.baseUrl}/payments/kakao/cancel`,
      fail_url: `${this.baseUrl}/payments/kakao/fail`,
    });

    return readyResponse;
  }
}
