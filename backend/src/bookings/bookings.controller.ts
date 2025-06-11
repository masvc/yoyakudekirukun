import { Controller, Get, Post, Body, Patch, Param, ValidationPipe } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('api/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body(ValidationPipe) createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }

  @Patch(':id/assign-operator')
  assignOperator(
    @Param('id') id: string,
    @Body() body: { operatorId: number }
  ) {
    return this.bookingsService.assignOperator(+id, body.operatorId);
  }
}