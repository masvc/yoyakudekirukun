import { IsString, IsEmail, IsEnum, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { SportType, SkillLevel } from '../../entities/booking.entity';

export class CreateBookingDto {
  @IsString()
  customerName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsEnum(SportType)
  sportType: SportType;

  @IsString()
  planType: string;

  @IsDateString()
  date: string;

  @IsString()
  time: string;

  @IsString()
  location: string;

  @IsNumber()
  participants: number;

  @IsOptional()
  @IsEnum(SkillLevel)
  skillLevel?: SkillLevel;

  @IsOptional()
  @IsString()
  requests?: string;
}