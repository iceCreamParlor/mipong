import { Module } from '@nestjs/common';
import { KakaoPayService } from '../lib/payments/kakaopay';
import { TossService } from '../lib/payments/toss';
import { PaymentsController } from './payments.controller';

@Module({
  controllers: [PaymentsController],
  providers: [],
})
export class PaymentsModule {}
