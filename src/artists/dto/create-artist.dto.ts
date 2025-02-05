import {
  IsArray,
  IsNumber,
  IsOptional,
  IsNotEmpty,
} from "class-validator";

export class CreateArtistDTO {
  @IsNumber()
  @IsNotEmpty()
  readonly user: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly songs;
}
