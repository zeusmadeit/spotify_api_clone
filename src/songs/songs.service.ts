import { Injectable, Inject, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'src/common/constants/connection';
import { Song } from './entities/song.entity';
import { In, Repository, UpdateResult } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';  
import { Artist } from 'src/artists/entities/artist.entity';

@Injectable({scope: Scope.TRANSIENT})
export class SongsService {
  constructor(
    @Inject("CONNECTION") connection: Connection,
    @InjectRepository(Song) private songRepository: Repository<Song>,
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {
    // console.log("connection string", connection.CONNECTION_STRING);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');
    return paginate<Song>(queryBuilder, options);

    // old method before applying sorting logic with queryBuilder
    // return paginate<Song>(this.songRepository, options); 
  }

  async create(songDTO: CreateSongDto): Promise<Song> {
    // Save the song in the database
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;

    // fetch the artists from the db
    // const artists = await this.artistRepository.findByIds(songDTO.artists); // this method is deprecated
    const artists = await this.artistRepository.findBy({ id: In(songDTO.artists) });
    song.artists = artists;

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

  update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult> {
    return this.songRepository.update(id, recordToUpdate);
  }    

  async delete(id: number): Promise<void> {
    // delete song by id
    await this.songRepository.delete(id);
  }
}
