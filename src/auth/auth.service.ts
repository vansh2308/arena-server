
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import User from 'src/users/user.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { username, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    // WIP: Check if user already exists  
    const user = await this.usersRepository.create({
      username: username,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);
    const token = this.jwtService.sign({ username: user.username }, { expiresIn: 3600 });
    return { token };
  }



  async login(loginDto: LoginDto): Promise<{ 
    access_token: string, 
    refresh_token: string, 
    token_type: 'Bearer',  
    expires_in: Number
  }> {
    const { username, password } = loginDto;
    const user = await this.usersRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ username: user.username }, { expiresIn: 3600 });
    return { 
      access_token: token,
      refresh_token: token,
      token_type: 'Bearer',
      expires_in: 3600
     };
  }
}