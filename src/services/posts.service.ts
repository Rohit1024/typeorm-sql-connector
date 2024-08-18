import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostDTO } from 'src/dtos/post.dto';
import { BlogPost } from 'src/entities/posts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(BlogPost)
    private postsRepository: Repository<BlogPost>,
  ) {}

  createPost(createPostDTO: PostDTO): Promise<BlogPost> {
    const post = this.postsRepository.create({ ...createPostDTO });
    return this.postsRepository.save(post);
  }

  updatePost(id: string, updateUserDTO: PostDTO) {
    return this.postsRepository.update(id, updateUserDTO);
  }

  findAllPosts(): Promise<BlogPost[]> {
    return this.postsRepository.find();
  }

  findOneById(id: string): Promise<BlogPost | null> {
    return this.postsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async removeOneById(id: string): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
