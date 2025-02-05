import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerModule } from './common/middleware/logger/logger.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/entities/song.entity';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { User } from './users/entities/user.entity';
import { Artist } from './artists/entities/artist.entity';
import { PlaylistsModule } from './playlists/playlists.module';

@Module({
  imports: [
    SongsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'spotify_db',
      entities: [Song, User, Artist],
      synchronize: true, // set to false in production
    }),
    LoggerModule,
    UsersModule,
    ArtistsModule,
    PlaylistsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    // Factory based providers are used when the provision 
    // of a class or value is contingent upon runtime conditions
    {
      provide: "CONFIG",
      useFactory:  () => {
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      },
    },
  ],
})
export class AppModule implements NestModule {
  // inject the DataSource class into the AppModule
  constructor(private dataSource: DataSource) {
    console.log('Database:', dataSource.driver.database);
  }
  // configure middlewares to be used in the application
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); // option no 1
    // consumer
    // .apply(LoggerMiddleware)
    // .forRoutes({ path: 'songs', method: RequestMethod.POST }); //option no 2
    consumer.apply(LoggerMiddleware).forRoutes(SongsController); //option no 3
  }
}

const devConfig = {
  port: 3000
};
  const proConfig = {
  port: 400
};
