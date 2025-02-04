import { Controller, Param, Post, Get, Put, Delete, HttpException, HttpStatus, Query, DefaultValuePipe, ParseIntPipe, Body, Scope } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './entities/song.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { UpdateResult } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';  

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
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,
  ): Promise< Pagination < Song >> {
    // Refactor the code to use the paginate method from the service
    // to fetch the songs from the database
    limit = limit > 100 ? 100 : limit;
    try {
      return this.songsService.paginate({ page, limit, });
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
