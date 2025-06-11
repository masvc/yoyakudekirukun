import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Operator } from '../entities/operator.entity';

export enum BookingStatus {
  PENDING = 'pending',
  ASSIGNED = 'assigned',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum SportType {
  SKIING = 'skiing',
  GOLF = 'golf',
  MARINE = 'marine'
}

export enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  PROFESSIONAL = 'professional'
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({
    type: 'text',
    transformer: {
      to: (value: SportType) => value,
      from: (value: string) => value as SportType
    }
  })
  sportType: SportType;

  @Column()
  planType: string;

  @Column({ type: 'date' })
  date: string;

  @Column()
  time: string;

  @Column()
  location: string;

  @Column()
  participants: number;

  @Column({
    type: 'text',
    nullable: true,
    transformer: {
      to: (value: SkillLevel) => value,
      from: (value: string) => value as SkillLevel
    }
  })
  skillLevel: SkillLevel;

  @Column({
    type: 'text',
    default: BookingStatus.PENDING,
    transformer: {
      to: (value: BookingStatus) => value,
      from: (value: string) => value as BookingStatus
    }
  })
  status: BookingStatus;

  @Column({ type: 'text', nullable: true })
  requests: string;

  @ManyToOne(() => Operator, { nullable: true, eager: true })
  @JoinColumn()
  assignedOperator: Operator;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}