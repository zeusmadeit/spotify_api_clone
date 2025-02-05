import { Playlist } from "src/playlists/entities/playlist.entity";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  /**
  * A user can create many playLists
  */
  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];

  @Column({ unique: true })
  email: string;

  @Column({select: false})
  password: string;
}
