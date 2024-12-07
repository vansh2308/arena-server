import { Body, Controller, Get, Param, Post, Delete, UseGuards } from '@nestjs/common';
import User from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    const users = await this.usersService.getAllUsers();
    return users;
  }

  @Get(':username')
  async getUserById(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.getUserById(username);
    return user;
  }

  @Post()
  // WIP: @UseGuards(AuthGuard('jwt'))
  // WIP: encrypt password
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(createUserDto);
    return newUser;
  }

  @Delete(':username')
  async deleteById(@Param('username') username: string): Promise<User> {
    const user = this.usersService.deleteById(username);
    return user;
  }
}