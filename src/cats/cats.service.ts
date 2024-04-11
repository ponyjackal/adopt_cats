import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Cat } from "../database/entity/Cat";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";

@Injectable()
export class CatsService {
  // Inject the repository associated with the Cat entity for database operations
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>
  ) {}

  // Creates a new cat record in the database
  async create(catDto: CreateCatDto): Promise<Cat> {
    // Create a new Cat instance and assign DTO properties to it
    const cat = new Cat();
    cat.name = catDto.name;
    cat.age = catDto.age;
    cat.breed = catDto.breed;

    try {
      // Save the Cat instance to the database
      await this.catsRepository.save(cat);
      return cat;
    } catch (err) {
      // Throw a BadRequestException if saving fails
      throw new BadRequestException(err.message);
    }
  }

  // Retrieves all cat records from the database
  async findAll(): Promise<Cat[]> {
    try {
      const cats = await this.catsRepository.find();
      return cats;
    } catch (err) {
      // Throw an InternalServerErrorException in case of database read errors
      throw new InternalServerErrorException(err.message);
    }
  }

  // Retrieves a single cat record by its ID
  async findOne(id: number): Promise<Cat> {
    const cat = await this.catsRepository.findOneBy({ id });
    if (!cat) {
      // Throw a NotFoundException if no cat is found with the given ID
      throw new NotFoundException(`Cat with id ${id} not found`);
    }

    return cat;
  }

  // Updates an existing cat record
  async update(id: number, updateCatDto: UpdateCatDto): Promise<Cat> {
    const cat = await this.catsRepository.findOneBy({ id });
    if (!cat) {
      // Throw a NotFoundException if no cat is found with the given ID
      throw new NotFoundException(`Cat with id ${id} not found`);
    }

    // Update the cat record with new values from the DTO
    Object.assign(cat, updateCatDto);

    try {
      // Save the updated cat record to the database
      await this.catsRepository.save(cat);
      return cat;
    } catch (err) {
      // Throw a BadRequestException if saving the updated record fails
      throw new BadRequestException(err.message);
    }
  }

  // Deletes a cat record from the database
  async delete(id: number) {
    const cat = await this.catsRepository.findOneBy({ id });
    if (!cat) {
      // Throw a NotFoundException if no cat is found with the given ID
      throw new NotFoundException(`Cat with id ${id} not found`);
    }

    try {
      // Delete the cat record
      await this.catsRepository.delete(cat);
    } catch (err) {
      // Throw an InternalServerErrorException in case of database delete errors
      throw new InternalServerErrorException(err.message);
    }
  }
}
