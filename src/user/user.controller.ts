import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./createUser.dto";
import { UserResponseInterface } from "./types/userResponse.interface";
import { LoginDto } from "./getUser.dto";
import { UserEntity } from "./user.entity";
import { AuthGyard } from "./guards/auth.guard";
import { UpdateUserDto } from "./userUpdate.dto";
import { User } from "./decoraters/user.decorator";


@Controller()
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post("users")
    @UsePipes(new ValidationPipe())
    async createUser(@Body("user") createUserDto: CreateUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponse(user)
    };

    @Post("users/login")
    @UsePipes(new ValidationPipe())
    async login(@Body("user") loginDto: LoginDto): Promise<UserResponseInterface> {
            const user = await this.userService.login(loginDto)
            return this.userService.buildUserResponse(user)
    };
    
    @Get("user") 
    @UseGuards(AuthGyard)
    async currentUser(@User() user: UserEntity, @User("id") userId: number): Promise<UserResponseInterface> {
        return this.userService.buildUserResponse(user)
    };
    
    @Put("user")
    @UseGuards(AuthGyard)
    async updateCurrentUser(@User("id") currentUserId: number, @Body("user") updateUser: UpdateUserDto): Promise<UserResponseInterface> {
        const user =  await this.userService.updateUser(currentUserId, updateUser);
        return this.userService.buildUserResponse(user)
    };
} 