import { ForbiddenException, Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// use injectable to create or dectorate providers aka service
@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    try {
      // our db is expecting a hash not a password, for security reasons we transform our password to hash using argon2
      // gen hash
      const hash = await argon.hash(dto.password);
      // gen new user in the db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
        //   what should be returned if user was successfully created
        //   select: {
        //     id: true,
        //     email: true,
        //     createdAt: true,
        //   },
      });
      // remove hash from the user object ands return user without hash...
      // this deletion does not affect the db record for the saved user
      //   delete user.hash;
      //   return user;
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        //   P2002 error code for duplicate
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      } else {
        throw new error();
      }
    }
  }
  async signin(dto: AuthDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user does not exist throw exception error
    if (!user) throw new ForbiddenException('Email does not exist');

    // compare password

    const passwordMatches = await argon.verify(user.hash, dto.password);
    // if password is incorrect throw exception error
    if (!passwordMatches) throw new ForbiddenException('Incorrect password');
    // delete user.hash;
    // send back the user
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });
    return {
      access_token,
    };
  }
}
