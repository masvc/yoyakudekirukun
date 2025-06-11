import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../entities/booking.entity';
import { Operator } from '../entities/operator.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Operator)
    private operatorRepository: Repository<Operator>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const bookingData = {
      ...createBookingDto,
      // specialRequestsを文字列に変換
      specialRequests: createBookingDto.specialRequests 
        ? JSON.stringify(createBookingDto.specialRequests) 
        : undefined
    };
    
    const booking = this.bookingRepository.create(bookingData);
    return this.bookingRepository.save(booking);
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find({
      relations: ['assignedOperator'],
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['assignedOperator']
    });
    
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    
    return booking;
  }

  async assignOperator(bookingId: number, operatorId: number): Promise<Booking> {
    const booking = await this.findOne(bookingId);
    const operator = await this.operatorRepository.findOne({ 
      where: { id: operatorId } 
    });
    
    if (!operator) {
      throw new NotFoundException(`Operator with ID ${operatorId} not found`);
    }
    
    booking.assignedOperator = operator;
    booking.status = 'assigned' as any;
    
    return this.bookingRepository.save(booking);
  }
}