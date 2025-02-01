import { NestMiddleware, Injectable } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log("Request ....", new Date().toDateString(), new Date().toTimeString());
    next();
  }
}
