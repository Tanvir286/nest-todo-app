import { IsString, IsNumber, IsOptional, IsDateString, IsBoolean, IsUrl } from 'class-validator';

export class CreateProductDto {

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  genericName?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  dosageForm?: string;

  @IsOptional()
  @IsString()
  strength?: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  purchasePrice?: number;

  @IsNumber()
  stock: number;

  @IsOptional()
  @IsString()
  manufacturer?: string;

  @IsOptional()
  @IsDateString()
  expiryDate?: Date;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

}
