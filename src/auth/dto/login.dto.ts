import { IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class LoginDto {

    @IsNotEmpty()
    @IsString()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
    
    // @IsOptional()
    // @IsString()
    // image?: string;


}    