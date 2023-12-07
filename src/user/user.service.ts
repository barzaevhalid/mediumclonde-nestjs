import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./createUser.dto";
import { UserEntity } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {sign} from "jsonwebtoken"
import { JWR_SECRET } from "@app/config";
import { UserResponseInterface } from "./types/userResponse.interface";
import { LoginDto } from "./getUser.dto";
import {compare} from "bcrypt"


@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {

        const userByEmail = await this.userRepository.findOne({ where: {email: createUserDto.email}});
        const userByUsername = await this.userRepository.findOne({ where: {email: createUserDto.username}});

        if(userByEmail || userByUsername) {
            throw new HttpException("Email or use are taken", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);
        return await this.userRepository.save(newUser);
    }

    generateJwt(user: UserEntity): string {
        return sign({
            id: user.id,
            username: user.username,
            email: user.email

        }, JWR_SECRET)
    }

    buildUserResponse(user: UserEntity): UserResponseInterface {
        return {
            user: {
                ...user,
                token: this.generateJwt(user)
            }
        }
    };

    async login(loginDto: LoginDto): Promise<UserEntity> {
        
        const user = await this.userRepository.findOne({where: {email: loginDto.email}})
        if(!user) {
            throw new HttpException("Email or password are wrong", HttpStatus.BAD_REQUEST)
        }

        const isValidPassword = await compare(loginDto.password , user.password)
        if(!isValidPassword) {
            throw new HttpException("Email or password are wrong", HttpStatus.BAD_REQUEST)
        }
            delete user.password
        return user
    }
} 