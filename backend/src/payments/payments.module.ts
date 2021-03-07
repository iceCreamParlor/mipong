import { Module } from '@nestjs/common';
import { KakaoPayService } from '../lib/payments/kakaopay';
import { PaymentsController } from './payments.controller';

@Module({
  controllers: [PaymentsController],
  providers: [KakaoPayService],
})
export class PaymentsModule {}
