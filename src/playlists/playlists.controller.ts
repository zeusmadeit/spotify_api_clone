import { Body, Controller, Post } from "@nestjs/common";
import { Playlist } from "./entities/playlist.entity";
import { CreatePlaylistDTO } from "./dto/create-playlist.dto";
import { PlaylistsService } from "./playlists.service";

@Controller('playlists')
export class PlaylistsController {
  constructor(private playlistService: PlaylistsService) {}

  @Post()
  create(@Body() playlistDTO: CreatePlaylistDTO): Promise<Playlist> {
    return this.playlistService.create(playlistDTO);
  }
}
