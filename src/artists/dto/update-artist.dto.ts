import {
  IsArray,
  IsNumber,
  IsOptional,
} from "class-validator";

export class UpdateArtistDto {
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly songs;
}
