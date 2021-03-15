import { Body, Param, Res } from '@nestjs/common';
import {
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';

import { query, Response as ExResponse } from 'express';

import { KakaoPayService } from '../lib/payments/kakaopay';
import {
  TossApproveResponse,
  TossFail,
  TossService,
  TossSubscriptionApproveParam,
  TossSubscriptionGetBillingKeyResponse,
  TossSubscriptionGetBillingKeyWithCardParam,
} from '../lib/payments/toss';

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

  @Get('/toss/getPromotion')
  async getPromition() {
    const result = await this.tossService.getCardPromition();

    return result;
  }

  @Get('/toss/onetime/success')
  async approveTossOnetime(
    @Query() query,
    @Res() res: ExResponse,
  ): Promise<any> {
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

    const result = await this.tossService.approveOneTime(approveParam);

    if (result.success === true) {
      res.redirect(
        `http://localhost:3000/orderComplete?pg=toss&status=${result.data.status}&paymentKey=${result.data.paymentKey}&orderCid=${result.data.orderId}`,
      );
    } else {
      res.redirect(`http://localhost:3000`);
    }
  }

  @Get('/toss/subscription/success')
  async subscriptionSuccess(@Query() query, @Res() res: ExResponse) {
    const { customerKey, authKey } = query;
    console.log(`customerKey : ${customerKey} authKey: ${authKey}`);
    const result = await this.tossService.getSubscriptionBillingKey({
      authKey,
      customerKey,
    });
    console.log(result);

    if (result.success === true) {
      res.redirect(
        `http://localhost:3000/orderComplete?pg=toss&paymentKey=${result.data.customerKey}&orderCid=${result.data.mId}`,
      );
    } else {
    }
  }

  @Post('/toss/getKeyInBillingKey')
  async getKeyInBillingKey(
    @Body() param: TossSubscriptionGetBillingKeyWithCardParam,
  ) {
    const result = await this.tossService.getSubscriptionBillingKeyWithCard(
      param,
    );
    if (result.success === true) {
      console.log(result.data);
    } else {
      console.log(result.data);
    }
    return result;
  }

  @Post('/toss/subscription')
  async subscription(@Body() param: TossSubscriptionApproveParam) {
    const result = await this.tossService.approveSubscription(param);

    return result;
  }

  @Post('/toss/cancelPayment')
  async cancelPayment(@Body() param: { paymentKey: string }) {
    const result = await this.tossService.cancelPayment({
      paymentKey: param.paymentKey,
      cancelReason: '그냥',
    });

    return result;
  }

  @Post('/toss/:paymentId')
  async getPayment(@Param('paymentId') paymentId: string) {
    const result = await this.tossService.getPayment(paymentId);

    return result;
  }
}
