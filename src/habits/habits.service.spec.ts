import { Test, TestingModule } from '@nestjs/testing';
import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';

describe('HabitsController', () => {
  let controller: HabitsController;
  let service: HabitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitsController],
      providers: [
        // New: Providing a Mock version of HabitsService
        // This prevents the "Nest can't resolve dependencies" error
        {
          provide: HabitsService,
          useValue: {
            // We mock the methods that the controller calls
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Test Habit', isCompleted: false }),
            create: jest.fn().mockImplementation((dto) => 
              Promise.resolve({ id: Date.now(), ...dto, isCompleted: false })
            ),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<HabitsController>(HabitsController);
    service = module.get<HabitsService>(HabitsService);
  });

  it('should be defined', () => {
    // This test ensures the controller is instantiated correctly with its dependencies
    expect(controller).toBeDefined();
  });

  it('should call service.findAll when controller.findAll is called', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });
});