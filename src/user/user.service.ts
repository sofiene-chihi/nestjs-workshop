import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UserInfo } from './interfaces/userInfo';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async createUser(payload: RegisterDto): Promise<User> {
    const { email, password } = payload;

    if (await this.userRepository.findOne({ email })) {
      throw new HttpException(
        {
          message: 'USER_ALREADY_EXISTS',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const encryptedPassword = await bcrypt.hash(password, 8);

      const newUser = await this.userRepository.create({
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
        email: payload.email,
        password: encryptedPassword,
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          message: 'REGISTRATION_ERROR',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loginUser(payload: LoginDto): Promise<User> {
    const { email, password } = payload;

    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new HttpException(
        {
          message: 'USER_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      throw new HttpException(
        {
          message: 'WRONG_PASSWORD',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }

  async getUserInfo(id:number) : Promise<UserInfo>{
    
    const user = await this.userRepository.findOne(id);

    if(!user){
        throw new HttpException({
            message:'USER_NOT_FOUND'
        },
        HttpStatus.NOT_FOUND)
    }
    const { firstName, lastName, phone, email} = user
    return {
        firstName,
        lastName,
        phone,
        email
    }

  }
}
