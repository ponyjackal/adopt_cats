import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Role } from "../common/enums/role.enum";
import { Roles } from "../common/decorators/roles.decorator";
import { User } from "../database/entity/User";
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "Return all users.", type: [User] })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a user by ID" })
  @ApiParam({ name: "id", description: "User ID", type: Number })
  @ApiResponse({
    status: 200,
    description: "Return a single user.",
    type: User,
  })
  @ApiResponse({ status: 404, description: "User not found." })
  async findOne(
    @Param("id", new ParseIntPipe())
    id: number
  ): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a user" })
  @ApiParam({ name: "id", description: "User ID", type: Number })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: "User updated successfully.",
    type: User,
  })
  async update(
    @Param("id", new ParseIntPipe())
    id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @Roles(Role.Admin)
  @ApiOperation({ summary: "Delete a user" })
  @ApiParam({ name: "id", description: "User ID", type: Number })
  @ApiResponse({ status: 200, description: "User successfully deleted." })
  async remove(
    @Param("id", new ParseIntPipe())
    id: number
  ) {
    await this.usersService.remove(id);
    return { message: "User successfully deleted." };
  }
}
