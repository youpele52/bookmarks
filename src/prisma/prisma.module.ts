import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

//  @Global(), this decorator will make this module available everywhere in the app
// without explicitely importing it to the module
@Global()
@Module({
  providers: [PrismaService],
  // if you want to use this PrismaService elsewhere
  // you have to export it
  exports: [PrismaService],
})
export class PrismaModule {}
