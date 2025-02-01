import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHi(id: string): string {
    return 'Hi ' + id;
  }
}
