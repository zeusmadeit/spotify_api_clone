import { Song } from "src/songs/entities/song.entity";
import { User } from "src/users/entities/user.entity";
import {
  Entity,
  JoinColumn,
  OneToOne,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity("artists")
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  // A user can register as an artist
  // Each artist will have only 1 user profile
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  // An artist can have many songs
  // Each song can have many artists
  @ManyToMany(() => Song, (song) => song.artists)
  songs: Song[];

}
