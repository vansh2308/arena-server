
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import * as bcrypt from 'bcryptjs';
// import { JwtService } from '@nestjs/jwt';
// import { SignUpDto } from './dto/signup.dto';
// import { LoginDto } from './dto/login.dto';
// import User from 'src/users/user.entity';

// @Injectable()
// export class AuthService {

//   constructor(
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//     private jwtService: JwtService,
//   ) { }

//   async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
//     const { username, password } = signUpDto;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // WIP: Check if user already exists  
//     const user = await this.usersRepository.create({
//       username: username,
//       password: hashedPassword,
//     });

//     await this.usersRepository.save(user);
//     const token = this.jwtService.sign({ username: user.username }, { expiresIn: 3600 });
//     return { token };
//   }



//   async login(loginDto: LoginDto): Promise<{ 
//     access_token: string, 
//     refresh_token: string, 
//     token_type: 'Bearer',  
//     expires_in: Number
//   }> {
//     const { username, password } = loginDto;
//     const user = await this.usersRepository.findOne({
//       where: { username },
//     });

//     if (!user) {
//       throw new UnauthorizedException('Invalid email or password');
//     }

//     const isPasswordMatched = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatched) {
//       throw new UnauthorizedException('Invalid email or password');
//     }

//     const token = this.jwtService.sign({ username: user.username }, { expiresIn: 3600 });
//     return { 
//       access_token: token,
//       refresh_token: token,
//       token_type: 'Bearer',
//       expires_in: 3600
//      };
//   }
// }


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
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ access_token: string; refresh_token: string }> {
    const { username, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    const existingUser = await this.usersRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    const access_token = this.jwtService.sign({ username: user.username }, { expiresIn: '15m' });
    const refresh_token = this.jwtService.sign({ username: user.username }, { expiresIn: '7d' });

    return { access_token, refresh_token };
  }

  async login(loginDto: LoginDto): Promise<{
    access_token: string;
    refresh_token: string;
    token_type: 'Bearer';
    expires_in: number;
  }> {
    const { username, password } = loginDto;
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const access_token = this.jwtService.sign({ username: user.username }, { expiresIn: '15m' });
    const refresh_token = this.jwtService.sign({ username: user.username }, { expiresIn: '7d' });

    return {
      access_token,
      refresh_token,
      token_type: 'Bearer',
      expires_in: 900, // 15 minutes in seconds
    };
  }

  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.usersRepository.findOne({ where: { username: payload.username } });

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const access_token = this.jwtService.sign({ username: user.username }, { expiresIn: '15m' });
      return { access_token };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
