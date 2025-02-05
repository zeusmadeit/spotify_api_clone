import { 
  Controller, 
  Post, 
  Get, 
  Patch, 
  Delete, 
  Param, 
  Body, 
  ParseIntPipe 
} from '@nestjs/common';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { UpdateArtistDTO } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { ArtistsService } from './artists.service';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  // @Post()
  // async create(@Body() createArtistDTO: CreateArtistDTO): Promise<Artist> {
  //   return await this.artistsService.create(createArtistDTO);
  // }

  // @Get()
  // async findAll(): Promise<Artist[]> {
  //   return await this.artistsService.findAll();
  // }

  // @Get(':id')
  // async findOne(@Param('id', ParseIntPipe) id: number): Promise<Artist | null> {
  //   return await this.artistsService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id', ParseIntPipe) id: number, @Body() updateArtistDTO: UpdateArtistDTO) {
  //   return this.artistsService.update(id, updateArtistDTO);
  // }

  // @Delete(':id')
  // async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
  //   this.artistsService.delete(id);
  // }
}
