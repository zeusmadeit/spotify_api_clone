import {
  IsArray,
  IsDate,
  IsDateString,
  IsInt,
  IsOptional,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
} from "class-validator";

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  readonly title;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly artists;

  @IsDateString()
  @IsNotEmpty()
  readonly releasedDate: Date;

  @IsMilitaryTime()
  @IsNotEmpty()
  readonly duration: Date;

  @IsString()
  @IsOptional()
  readonly lyrics: string;

  // @IsArray()
  // @IsNotEmpty()
  // readonly genres: string[];
}
