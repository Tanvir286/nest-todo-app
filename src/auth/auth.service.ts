import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/entity/user.enity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { v4 as uuidv4 } from 'uuid'; // ✅ Refresh token-এর জন্য
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /*<===============(Register Start)===============>
  =================================================>*/

  async register(registerDto: RegisterDto) {
    
    const { name, email, password } = registerDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const refreshToken = uuidv4(); // ✅ রিফ্রেশ টোকেন তৈরি

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      refreshToken,
    });

    await this.userRepository.save(user);

    // ✅ JWT Token Payload
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      message: 'User registered successfully',
      access_token: this.jwtService.sign(payload), // ✅ অ্যাক্সেস টোকেন
      refresh_token: this.jwtService.sign({ refreshToken }, { expiresIn: '7d' }), // ✅ রিফ্রেশ টোকেন
      user: {
        ...payload
      },
    };
  }
  /*<===============(Register End)===============>
  =================================================>*/


   /*<===============(Login Start)===============>
  =================================================>*/

  async login(loginDto: LoginDto) {
    
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // ✅ নতুন Refresh Token তৈরি করা
    const newRefreshToken = uuidv4();
    await this.userRepository.update(user.id, { refreshToken: newRefreshToken });

    // ✅ JWT Token Payload
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      message: 'User logged in successfully',
      access_token: this.jwtService.sign(payload), // ✅ অ্যাক্সেস টোকেন
      refresh_token: this.jwtService.sign({ refreshToken: newRefreshToken }, { expiresIn: '7d' }), // ✅ রিফ্রেশ টোকেন
      user: {
        ...payload
      },
    };
  }


}
