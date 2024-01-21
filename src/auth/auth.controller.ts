import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

// the 'auth' in here is a prefix for all the route here
// eg POST /auth/signin
@Controller('auth')
// Controllers are responsible for handling incoming requests
// and returning responses for the client
export class AuthController {
  // nestjs will instatiate the AuthService
  //   kinda like Angular
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  //   signup(@Req() req: Request)
  // you can use this, req, to get all of the express properties
  // @Body() is from nest
  // dto= data transfer object, this can be used to validate the incoming data and do other things
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
