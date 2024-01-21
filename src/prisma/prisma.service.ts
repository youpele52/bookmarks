import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

// for any class in nest to use dependency injection, that class should be decorated with @Injectable()
// meaning we can inject external services into it
@Injectable()
// PrismaClient is class that enable us to connect to a db
// it has a constructer, excecute
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    // super calls the constrcutor of the classs that is being extended here ie PrismaClient
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDb() {
    // transaction makes sure things are done in the order that theyre written
    // boookmar is deleted first then user is delete
    return this.$transaction([
      this.bookmark.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
