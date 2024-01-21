import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from '../../src/strategy';
import { JwtStrategy } from '../strategy';
// import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  // instead of importing every module that you want to use here
  // certain modules that are used across the app in different
  // modules can be set to global using this decorator
  //  @Global() on top of the module definition
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  //  using the JwtStrategy, we can protect certain routes
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
