import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SigninDto } from 'src/dtos/users/signin.dto';
import { SignupDto } from 'src/dtos/users/signup.dto';
import { GetUsersResponse } from 'src/responses/users/getusers.response';
import { SigninResponse } from 'src/responses/users/signin.response';
import { SignupResponse } from 'src/responses/users/signup.response';
import { UsersService } from 'src/services/users/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    this.usersService = usersService;
  }

  @ApiResponse({
    status: 200,
    description: 'Returns the users service status',
    type: [String],
  })
  @Get('/')
  healthCheck(): string {
    return 'ok';
  }

  @ApiResponse({
    status: 200,
    description: 'Returns an array of users',
    type: [GetUsersResponse],
  })
  @Get('list')
  async getUsers(): Promise<GetUsersResponse[]> {
    return await this.usersService.getUsers();
  }

  @ApiBody({ type: SignupDto })
  @ApiResponse({
    status: 200,
    description: 'User created',
    type: SignupResponse,
  })
  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<SignupResponse> {
    try {
      return await this.usersService.signup(signupDto);
    } catch (error) {
      return error;
    }
  }

  @ApiBody({ type: SigninDto })
  @ApiResponse({
    status: 200,
    description: 'Sign in successful',
    type: SigninResponse,
  })
  @Post('signin')
  async signIn(@Body() signinDto: SigninDto): Promise<SigninResponse> {
    return await this.usersService.signin(signinDto);
  }
}
