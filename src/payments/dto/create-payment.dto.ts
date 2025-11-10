import { IsNotEmpty, IsNumber, IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  studentId: number;

  @IsInt()
  groupId: number;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  status?: string;
}
