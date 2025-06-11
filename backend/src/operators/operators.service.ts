import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operator } from '../entities/operator.entity';

@Injectable()
export class OperatorsService {
  constructor(
    @InjectRepository(Operator)
    private operatorRepository: Repository<Operator>,
  ) {}

  async findAll(): Promise<Operator[]> {
    return this.operatorRepository.find({
      order: { rating: 'DESC' }
    });
  }

  async findAvailable(): Promise<Operator[]> {
    return this.operatorRepository.find({
      where: { available: true },
      order: { rating: 'DESC' }
    });
  }

  async create(operatorData: Partial<Operator>): Promise<Operator> {
    const operator = this.operatorRepository.create(operatorData);
    return this.operatorRepository.save(operator);
  }

  async seedData(): Promise<void> {
    const count = await this.operatorRepository.count();
    if (count === 0) {
      const operators = [
        {
          name: '山田 航',
          rating: 4.8,
          experience: '5年',
          specialty: 'ゴルフ撮影',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
          available: true
        },
        {
          name: '鈴木 空',
          rating: 4.9,
          experience: '7年',
          specialty: 'スキー撮影',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
          available: true
        },
        {
          name: '高橋 海',
          rating: 4.7,
          experience: '4年',
          specialty: 'マリンスポーツ',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332b69c?w=60&h=60&fit=crop&crop=face',
          available: false
        },
        {
          name: '佐藤 雲',
          rating: 4.6,
          experience: '3年',
          specialty: 'ゴルフ撮影',
          avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=60&h=60&fit=crop&crop=face',
          available: true
        }
      ];

      for (const operatorData of operators) {
        await this.create(operatorData);
      }
    }
  }
}