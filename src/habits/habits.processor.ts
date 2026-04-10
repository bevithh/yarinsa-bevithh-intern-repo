import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('habits-queue')
export class HabitsProcessor extends WorkerHost {
  // This method runs every time a job is pulled from Redis
  async process(job: Job<any, any, string>): Promise<any> {
    console.log(`Processing habit job ${job.id}...`);
    console.log('Data received:', job.data);

    // Pretend im calculating a streak or sending a notification
    await new Promise((resolve) => setTimeout(resolve, 3000)); 

    console.log(`Job ${job.id} finished!`);
    return { status: 'completed' };
  }
}