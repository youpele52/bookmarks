import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // we use this ConfigModule to load env file fields in our app, it uses dotenv lib under the hood
    // ConfigModule alos has its own service
    ConfigModule.forRoot({
      // is isGlobal set the ConfigModule and its Service to be globally available
      // this is the shortcut for gloablly an imported module
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
  ],
})
export class AppModule {}
