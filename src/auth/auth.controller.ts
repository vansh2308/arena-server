
import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @Post('/api/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ access_token: string, 
    refresh_token: string }> {
    return this.authService.signUp(signUpDto);
    
  }

  @Post('/api/login')
  login(@Body() loginDto: LoginDto): Promise<{ 
    access_token: string, 
    refresh_token: string, 
    token_type: 'Bearer',  
    expires_in: Number
  }> {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  async refreshToken(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}