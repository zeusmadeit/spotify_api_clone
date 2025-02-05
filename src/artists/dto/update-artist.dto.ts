import {
  IsArray,
  IsNumber,
  IsOptional,
} from "class-validator";

export class UpdateArtistDTO {
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly songs;
}
