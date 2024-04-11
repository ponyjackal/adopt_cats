import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Cat } from "../database/entity/Cat";
import { CreateCatDto } from "./dto/create-cat.dto";

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>
  ) {}

  async create(catDto: CreateCatDto): Promise<Cat> {
    const cat = new Cat();
    cat.name = catDto.name;
    cat.age = catDto.age;
    cat.breed = catDto.breed;

    try {
      await this.catsRepository.save(cat);
      return cat;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }
}
