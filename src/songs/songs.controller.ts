import { Controller, Param, Post, Get, Put, Delete, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}
  @Post()
  create(@Param('song') song: string) {
    // return this.songsService.create(song);
    return this.songsService.create("Animals by Martin Garrix");
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
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
      })
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
