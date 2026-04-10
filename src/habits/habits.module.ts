import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq'; //Import BullModule
import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';
import { Habit } from './habit.entity'; 
import { HabitsProcessor } from './habits.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Habit]),
    // Register the 'habits-queue'
    BullModule.registerQueue({
      name: 'habits-queue',
    }),
  ],
  controllers: [HabitsController],
  providers: [
    HabitsService, 
    HabitsProcessor // Add the processor to providers so Nest handles it
  ],
})
export class HabitsModule {}