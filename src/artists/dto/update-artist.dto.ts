import {
  IsArray,
  IsNumber,
  IsOptional,
} from "class-validator";

export class CreateArtistDto {
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly songs;
}
