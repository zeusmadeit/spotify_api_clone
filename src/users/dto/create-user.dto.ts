import {
  IsArray,
  IsDate,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsOptional()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
