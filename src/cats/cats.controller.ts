import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

import { Roles } from "../common/decorators/roles.decorator";
import { ParseIntPipe } from "../common/pipes/parse-int.pipe";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { Cat } from "../database/entity/Cat";
import { Role } from "../common/enums/role.enum";
import { Public } from "../common/decorators/public.decorator";
import { UpdateCatDto } from "./dto/update-cat.dto";

@ApiTags("cats")
@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: "Create a new cat" })
  @ApiResponse({
    status: 201,
    description: "The cat has been successfully created.",
    type: Cat,
  })
  @ApiBody({ type: CreateCatDto })
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: "Get all cats" })
  @ApiResponse({ status: 200, description: "An array of cats.", type: [Cat] })
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Public()
  @Get(":id")
  @ApiOperation({ summary: "Get a cat by ID" })
  @ApiParam({ name: "id", description: "Cat ID", type: Number })
  @ApiResponse({ status: 200, description: "The found cat", type: Cat })
  @ApiResponse({ status: 404, description: "Cat not found" })
  findOne(
    @Param("id", new ParseIntPipe())
    id: number
  ): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  @Put(":id")
  @Roles(Role.Admin)
  @ApiOperation({ summary: "Update a cat by ID" })
  @ApiParam({ name: "id", description: "Cat ID", type: Number })
  @ApiResponse({ status: 200, description: "The updated cat", type: Cat })
  @ApiBody({ type: UpdateCatDto })
  async update(
    @Param("id", new ParseIntPipe())
    id: number,
    @Body() updateCatDto: UpdateCatDto
  ): Promise<Cat> {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(":id")
  @Roles(Role.Admin)
  @ApiOperation({ summary: "Delete a cat by ID" })
  @ApiParam({ name: "id", description: "Cat ID", type: Number })
  @ApiResponse({ status: 200, description: "Cat successfully deleted." })
  async delete(
    @Param("id", new ParseIntPipe())
    id: number
  ) {
    await this.catsService.delete(id);
    return { message: "Cat successfully deleted." };
  }
}
