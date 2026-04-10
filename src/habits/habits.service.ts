import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habit } from './habit.entity';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(Habit)
    private habitsRepository: Repository<Habit>, // Injecting the TypeORM Repository
    @InjectQueue('habits-queue')
    private readonly habitsQueue: Queue,// Inject the 'habits-queue'
  ) {}

  // Get all habits from PostgreSQL
  findAll(): Promise<Habit[]> {
    return this.habitsRepository.find();
  }

  // Save a new habit to the database
  async createHabit(habitData: { name: string }) {
    // Save to Postgres (The immediate task)
    const newHabit = this.habitsRepository.create(habitData);
    const savedHabit = await this.habitsRepository.save(newHabit);
   // Add to BullMQ (The background task)
    // pass the habit ID so the processor knows which one to work on
    await this.habitsQueue.add('process-new-habit', {
      habitId: savedHabit.id,
      name: savedHabit.name,
      action: 'CREATED',
    });

    return savedHabit;
  }
  // Delete a habit by ID
  async removeHabit(id: number) {
    // Add to BullMQ first (to log/cleanup before it's gone)
    await this.habitsQueue.add('cleanup-habit-data', {
      habitId: id,
      action: 'DELETED',
    });

    // 2. Delete from Postgres
    return await this.habitsRepository.delete(id);
  }
}