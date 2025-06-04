

// register-user.dto.ts
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  // @IsOptional()
  // @IsString()
  // image?: string; 
  // ছবি ফাইল এখানে থাকবে না, কারণ file আলাদাভাবে হ্যান্ডল হবে controller-এ
}
