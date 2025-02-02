import { Injectable, Inject, Scope } from '@nestjs/common';
import { Connection } from 'src/common/constants/connection';

@Injectable({scope: Scope.TRANSIENT})
export class SongsService {
  constructor(@Inject("CONNECTION") connection: Connection) {
    console.log("connection string", connection.CONNECTION_STRING);
  }
  // local DB
  // local array
  private readonly songs: string[] = [];
  create(song) {
    // Save the song in the database
    this.songs.push(song);
    return this.songs;
  }
  findAll() {
    // fetch the songs from the db    
    return this.songs;
  }
}
