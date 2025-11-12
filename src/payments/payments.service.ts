import { Injectable } from '@nestjs/common';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  private payments: Payment[] = [];

  create(payment: Omit<Payment, 'id'>) {
    const newPayment: Payment = {
      id: Date.now(),
      ...payment,
    };
    this.payments.push(newPayment);
    return newPayment;
  }

  findAll() {
    return this.payments;
  }

  findOne(id: number) {
    return this.payments.find((p) => p.id === id);
  }

  remove(id: number) {
    this.payments = this.payments.filter((p) => p.id !== id);
    return { message: 'Payment deleted' };
  }
}
