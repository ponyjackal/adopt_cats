import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { Public } from "../common/decorators/public.decorator";
import { User } from "../database/entity/User";
import { LoginResponseDto } from "./dto/login-response.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  @ApiOperation({ summary: "User login" })
  @ApiResponse({
    status: 200,
    description: "User logged in successfully.",
    type: LoginResponseDto,
  })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  @ApiBody({ type: LoginDto })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post("register")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: "User registration" })
  @ApiResponse({
    status: 201,
    description: "User registered successfully.",
    type: User,
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  @ApiBody({ type: RegisterDto })
  register(@Body() registerDto: RegisterDto): Promise<User> {
    return this.authService.register(registerDto);
  }
}
