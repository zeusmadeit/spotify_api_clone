import { Injectable, Inject, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'src/common/constants/connection';
import { Song } from './entities/song.entity';
import { Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';

@Injectable({scope: Scope.TRANSIENT})
export class SongsService {
  constructor(
    @Inject("CONNECTION") connection: Connection,
    @InjectRepository(Song) private songRepository: Repository<Song>,
  ) {
    console.log("connection string", connection.CONNECTION_STRING);
  }

  async create(songDTO: CreateSongDto): Promise<Song> {
    // Save the song in the database
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;
    return await this.songRepository.save(song);
  }

  async findAll(): Promise<Song[]> {
    // fetch the songs from the db
    return await this.songRepository.find();
  }

  async findOne(id: number): Promise<Song | null> {
    // fetch the songs from the db
    return await this.songRepository.findOneBy({id});
  }

  async delete(id: number): Promise<void> {
    // delete song by id
    await this.songRepository.delete(id);
  }
}
