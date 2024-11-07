import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
    constructor(private readonly databaseService: DatabaseService) { }

    findAll() {
        return this.databaseService.user.findMany({
            include: {
                posts: {

                }
            }
        })
    }

    findOne(id: number) {

    }

    create(user: CreateUserDto) {

    }

    update(id: number, updatedUser: UpdateUserDto) {

    }

    delete(id: number) {

    }
}
