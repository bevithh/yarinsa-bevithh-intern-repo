import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { Roles } from '../roles.decorator';
import { RolesGuard } from '../roles.guard';   
// import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Usually required for Auth0
import { AuthGuard } from '@nestjs/passport';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt')) // Only users with a valid Auth0 token can see this!
  findAll() {
    return this.habitsService.findAll();
  }

  // Matches 'findAll' in the Service
  getAll() {
    return this.habitsService.findAll(); 
  }

  @Post()
  // @UseGuards(JwtAuthGuard) // Ensure user is logged in via Auth0
  create(@Body() createHabitDto: CreateHabitDto) {
    // Matches 'createHabit' in the Service
    return this.habitsService.createHabit(createHabitDto);
  }

  @Delete(':id')
  @Roles('admin') // Only users with the 'admin' role can access this
  @UseGuards(RolesGuard) // Apply the guard to check for the 'admin' role
  // @UseGuards(JwtAuthGuard, RolesGuard) // Final production version usually needs both
  remove(@Param('id') id: string) {
    // Matches 'removeHabit' in the Service
    return this.habitsService.removeHabit(Number(id));
  }
}