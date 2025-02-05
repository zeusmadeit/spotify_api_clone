import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlayListsController } from "./playlists.controller";
import { PlayListsService } from "./playlists.service";
import { Playlist } from './entities/playlist.entity';
import { Song } from 'src/songs/entities/song.entity';
import { User } from 'src/users/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Song, User])],
  controllers: [PlayListsController],
  providers: [PlayListsService],
})
export class PlaylistsModule {}
