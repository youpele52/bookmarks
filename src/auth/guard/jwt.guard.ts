import { AuthGuard } from '@nestjs/passport';

// 'jwt' here is the type of guard we are using for this route
//   and was defined/named in src/strategy/jwt.strategy.ts
export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
