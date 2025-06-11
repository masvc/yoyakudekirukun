import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Booking } from '../entities/booking.entity';
import { Operator } from '../entities/operator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Operator])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}