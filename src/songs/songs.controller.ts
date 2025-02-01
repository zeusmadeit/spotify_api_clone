import { Controller, Param, Post, Get, Put, Delete } from '@nestjs/common';
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
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne() {
    return 'Get a song';
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
