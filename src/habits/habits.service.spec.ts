import { Test, TestingModule } from '@nestjs/testing';
import { HabitsService } from './habits.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Habit } from './habit.entity';
import { getQueueToken } from '@nestjs/bullmq';

describe('HabitsService', () => {
let service: HabitsService;

// Mocking the TypeORM Repository
const mockHabitRepository = {
find: jest.fn().mockResolvedValue([{ id: 1, name: 'Meditation' }]),
findOneBy: jest.fn().mockResolvedValue({ id: 1, name: 'Meditation' }),
// Added create to fix the TypeError
create: jest.fn().mockImplementation((dto) => dto),
save: jest.fn().mockImplementation((habit) =>
Promise.resolve({ id: 1, ...habit })
),
delete: jest.fn().mockResolvedValue({ affected: 1 }),
};

// Mocking the BullMQ Queue
const mockHabitsQueue = {
add: jest.fn().mockResolvedValue({ id: 'job_id' }),
};

beforeEach(async () => {
const module: TestingModule = await Test.createTestingModule({
providers: [
HabitsService,
{
provide: getRepositoryToken(Habit),
useValue: mockHabitRepository,
},
{
provide: getQueueToken('habits-queue'),
useValue: mockHabitsQueue,
},
],
}).compile();

service = module.get<HabitsService>(HabitsService);
});

it('should be defined', () => {
expect(service).toBeDefined();
});

it('should return all habits', async () => {
const habits = await service.findAll();
expect(habits).toEqual([{ id: 1, name: 'Meditation' }]);
expect(mockHabitRepository.find).toHaveBeenCalled();
});

it('should create a habit, save it, and add it to the queue', async () => {
const dto = { name: 'Morning Run' };
const result = await service.createHabit(dto);
// Check if repository methods were called
expect(mockHabitRepository.create).toHaveBeenCalledWith(dto);
expect(mockHabitRepository.save).toHaveBeenCalled();
// Check if the result matches our mock expectation
expect(result).toEqual({ id: 1, name: 'Morning Run' });
});
});