import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Playlist } from "./entities/playlist.entity";
import { In, Repository } from "typeorm";
import { Song } from "src/songs/entities/song.entity";
import { User } from 'src/users/entities/user.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist) private playlistRepo: Repository<Playlist>,
    @InjectRepository(Song) private songsRepo: Repository<Song>,
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}
  
  async create(playlistDTO: CreatePlaylistDto): Promise<Playlist> {
    const playList = new Playlist();
    playList.name = playlistDTO.name;
    // songs will be the array of IDs that we are getting from the DTO object
    const songs = await this.songsRepo.findBy({id: In(playlistDTO.songs)});
    //Set the relation for the songs with the playlist entity
    playList.songs = songs;
    // A user will be the ID of the user we are getting from the request
    //When we implement the user authentication this id will become the logged in user id
    const user = await this.userRepo.findOneByOrFail({ id: playlistDTO.user });
    playList.user = user;
    return this.playlistRepo.save(playList);
  }
}
