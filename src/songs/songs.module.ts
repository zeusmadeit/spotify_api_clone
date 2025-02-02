import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connection';
  

@Module({
  controllers: [SongsController],
  providers: [
    SongsService,
    // Non class based providers
    // You can use it to add constant values
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ]
})
export class SongsModule {}
