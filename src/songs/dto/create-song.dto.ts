import {
  IsArray,
  IsDate,
  IsDateString,
  IsInt,
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

  // @IsArray()
  // @IsNotEmpty()
  // readonly genres: string[];
}
