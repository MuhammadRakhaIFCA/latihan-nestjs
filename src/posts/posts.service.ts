import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PostsService {
  constructor(private readonly databaseService: DatabaseService) { }
  create(createPostDto: Prisma.PostCreateInput) {
    return this.databaseService.post.create({
      data: createPostDto
    })
  }

  async findAll(userId: number) {
    const posts = await this.databaseService.post.findMany({
      include: {
        user: {
          select: {
            username: true,
          },
        },
        comments: {

        }
      },
    });

    return posts
  }

  async findOne(id: number) {
    const post = await this.databaseService.post.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profilePicture: true
          },
        },
        comments: {
          select: {
            content: true,
            user: {
              select: {
                id: true,
                username: true,
                profilePicture: true
              }
            }
          }
        }
      }
    })
    return post
  }

  async update(id: number, updatePostDto: Prisma.PostUpdateInput) {
    const updatedPost = await this.databaseService.post.update({
      where: { id },
      data: updatePostDto
    })
    return updatedPost
  }

  async remove(id: number) {
    return await this.databaseService.post.delete({
      where: { id }
    })
  }
}
