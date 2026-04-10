//MOCK PROCESSOR
jest.mock('../src/habits/habits.processor', () => ({
  HabitsProcessor: class MockHabitsProcessor {},
}));

// MOCK BULLMQ
//jest.mock('@nestjs/bullmq', () => {
  //const actual = jest.requireActual('@nestjs/bullmq');

  //return {
    //...actual,
    //BullModule: {
      //forRoot: jest.fn().mockReturnValue({
        //module: class MockBullRootModule {},
        //providers: [],
        //exports: [],
      //}),
      //registerQueue: jest.fn().mockReturnValue({
        //module: class MockBullQueueModule {},
        //providers: [],
        //exports: [],
      //}),
    //},
  //};
//}); 

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { HabitsModule } from '../src/habits/habits.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Habit } from '../src/habits/habit.entity';
import { getQueueToken } from '@nestjs/bullmq';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../src/roles.guard';

describe('Habits API (e2e) - Isolated', () => {
  let app: INestApplication;

  const mockHabitRepository = {
    find: jest.fn().mockResolvedValue([{ id: 1, name: 'Meditation' }]),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((habit) => Promise.resolve({ id: 1, ...habit })),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  const mockQueue = {
    add: jest.fn().mockResolvedValue({ id: 'job_id' }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HabitsModule],
      // Remove the mock queue from here
    })
      .overrideProvider(getRepositoryToken(Habit))
      .useValue(mockHabitRepository)
      // Add this line to override the Queue token
      .overrideProvider(getQueueToken('habits-queue'))
      .useValue(mockQueue)
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  it('/habits (GET)', () => {
    return request(app.getHttpServer())
      .get('/habits')
      .expect(200)
      .expect([{ id: 1, name: 'Meditation' }]);
  });
});