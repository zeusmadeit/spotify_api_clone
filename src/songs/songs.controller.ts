import { Controller, Param, Post, Get, Put, Delete, HttpException, HttpStatus, ParseIntPipe, Body, Scope } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { Song } from './entities/song.entity';

@Controller({
  path: "songs",
  scope: Scope.REQUEST, // A new instance of SongsController is created for every incoming request
})
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  create(@Body() createSongDTO: CreateSongDto): Promise<Song> {
    return this.songsService.create(createSongDTO);
  }

  @Get()
  findAll(): Promise<Song[]> {
    try {
      return this.songsService.findAll();
    }
    catch (e) {
      throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR, { cause: e },);
    }
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe(
      {errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}
    )) id: number,
  ): Promise<Song | null> {
    return this.songsService.findOne(id);
  }

  @Put(':id')
  update() {
    return 'Update a song';
  }

  @Delete(':id')
  remove(
    @Param('id', new ParseIntPipe(
      {errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}
    )) id: number
  ): Promise<void> {
    return this.songsService.delete(id);
  }
}
