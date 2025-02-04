import { Controller, Param, Post, Get, Put, Delete, HttpException, HttpStatus, ParseIntPipe, Body, Scope } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './entities/song.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { UpdateResult } from 'typeorm';

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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDTO: UpdateSongDto
  ): Promise<UpdateResult> {
    return this.songsService.update(id, updateSongDTO);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.songsService.delete(id);
  }
}
