import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHelloWorld() {
    console.log('Hello World!');
    return 'Hello World!';
  }
}
