import { Artist } from "src/artists/entities/artist.entity";
import { Playlist } from "src/playlists/entities/playlist.entity";
import { 
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity("songs")
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: "songs_artists" })
  artists: Artist[];

  /**
  * Many songs can belong to the playlist for each unique user
  */
  @ManyToOne(() => Playlist, (playList) => playList.songs)
  playlist: Playlist;

  @Column({ type: "date" })
  releasedDate: Date;

  @Column({ type: "time" })
  duration: Date;

  @Column({ type: "text" })
  lyrics: string;
}