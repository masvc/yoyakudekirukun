import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('operators')
export class Operator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 2, scale: 1 })
  rating: number;

  @Column()
  experience: string;

  @Column()
  specialty: string;

  @Column()
  avatar: string;

  @Column({ default: true })
  available: boolean;
}