import { IsString, MinLength } from 'class-validator';

export class CreateHabitDto {
  @IsString()
  @MinLength(3, { message: 'Habit name is too short (min 3 characters)' })
  name: string;
}
