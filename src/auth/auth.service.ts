import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/user/dto/register.dto';
import { CurrentUserPayload } from 'src/user/interfaces/currentUser.payload';
import { LoginResponse } from 'src/user/interfaces/login.response';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/user/dto/login.dto';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService){}

    async register(paylaod: RegisterDto): Promise<LoginResponse> {

        const user: User = await this.userService.createUser(paylaod)
        return this.sign(user)
    }


    async login(paylaod: LoginDto): Promise<LoginResponse>{
        const user: User = await this.userService.loginUser(paylaod)
        return this.sign(user)
    }

    sign(user: User): LoginResponse{

        const infoToSign:CurrentUserPayload={
            email: user.email,
            id: user.id
        }
        return {
            token : this.jwtService.sign(infoToSign)
        }
    }

}
