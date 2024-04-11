import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "../database/entity/User";
import { Role } from "src/common/enums/role.enum";

/**
 * Service handling user operations
 * Provides methods to manage users in the database.
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  /**
   * Creates a new user.
   *
   * @param createUserDto Data Transfer Object for user creation
   * @returns The created User entity
   * @throws BadRequestException on save error
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.roles = [Role.User]; // Default role

    try {
      await this.usersRepository.save(user);
      return user;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  /**
   * Retrieves all users.
   *
   * @returns An array of User entities
   */
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  /**
   * Retrieves a single user by ID.
   *
   * @param id The user's ID
   * @returns The found User entity
   */
  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  /**
   * Retrieves a single user by username.
   *
   * @param username The user's username
   * @returns The found User entity
   */
  async findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  /**
   * Updates a user.
   *
   * @param id The ID of the user to update
   * @param updateUserDto Data Transfer Object for user updates
   * @returns The updated User entity
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOneBy({ id });
  }

  /**
   * Removes a user.
   *
   * @param id The ID of the user to remove
   */
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
