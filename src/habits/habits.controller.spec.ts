import { Test, TestingModule } from '@nestjs/testing';
import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles.guard';

describe('HabitsController', () => {
  let controller: HabitsController;
  let service: HabitsService;

  const mockHabitsService = {
    findAll: jest.fn(),
    createHabit: jest.fn(),
    removeHabit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitsController],
      providers: [
        {
          provide: HabitsService,
          useValue: mockHabitsService,
        },
      ],
    })
      // Mock guards so they don't block tests
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<HabitsController>(HabitsController);
    service = module.get<HabitsService>(HabitsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.findAll when controller.findAll is called', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call service.createHabit when controller.create is called', async () => {
    const dto = { name: 'Test Habit' };

    await controller.create(dto as any);

    expect(service.createHabit).toHaveBeenCalledWith(dto);
  });

  it('should call service.removeHabit with correct id', async () => {
    await controller.remove('1');

    expect(service.removeHabit).toHaveBeenCalledWith(1);
  });
});