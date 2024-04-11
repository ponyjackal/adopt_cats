import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";

import { Roles } from "../common/decorators/roles.decorator";
import { ParseIntPipe } from "../common/pipes/parse-int.pipe";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { Cat } from "./interfaces/cat.interface";
import { Role } from "../common/enums/role.enum";
import { Public } from "../common/decorators/public.decorator";
import { UpdateCatDto } from "./dto/update-cat.dto";

@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Public()
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Public()
  @Get(":id")
  findOne(
    @Param("id", new ParseIntPipe())
    id: number
  ): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  @Put(":id")
  @Roles(Role.Admin)
  async update(
    @Param("id", new ParseIntPipe())
    id: number,
    @Body() updateCatDto: UpdateCatDto
  ): Promise<Cat> {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(":id")
  @Roles(Role.Admin)
  async delete(
    @Param("id", new ParseIntPipe())
    id: number
  ) {
    await this.catsService.delete(id);
    return { message: "Cat successfully deleted." };
  }
}
