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
import { User } from "./interfaces/user.interface";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  async findOne(
    @Param("id", new ParseIntPipe())
    id: number
  ): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  async update(
    @Param("id", new ParseIntPipe())
    id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @Roles(Role.Admin)
  async remove(
    @Param("id", new ParseIntPipe())
    id: number
  ) {
    await this.usersService.remove(id);
    return { message: "User successfully deleted." };
  }
}
