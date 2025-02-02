import { Controller, Param, Post, Get, Put, Delete, HttpException, HttpStatus, ParseIntPipe, Body } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  create(@Body() createSongDTO: CreateSongDto) {
    const results = this.songsService.create(createSongDTO);
    return results;
  }

  @Get()
  findAll() {
    try {
      return this.songsService.findAll();
    }
    catch (e) {
      throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR, { cause: e },);
    }
  }

  @Get(':id')
  findOne(
    @Param(
      'id', 
      new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
    )
    id: number,
  ) {
    return `fetch song based on the id ${typeof id}`;
  }

  @Put(':id')
  update() {
    return 'Update a song';
  }

  @Delete(':id')
  remove() {
    return 'Delete a song';
  }
}
