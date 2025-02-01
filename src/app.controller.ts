import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('/:dd/:id')
  // getHi(@Param('id') id: string, @Param('dd') dd: string): string {
  //   return this.appService.getHi(id) + ' this is ' + dd;
  // }
}
