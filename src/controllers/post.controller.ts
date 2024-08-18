import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostDTO } from 'src/dtos/post.dto';
import { BlogPost } from 'src/entities/posts.entity';
import { PostsService } from 'src/services/posts.service';
import { HttpExceptionFilter } from 'src/utils/exception-filters';

@UseFilters(new HttpExceptionFilter())
@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({ summary: 'Find all posts' })
  @ApiResponse({
    status: 200,
    description: 'Posts found successfully',
    type: [BlogPost],
  })
  @Get()
  async findAll(): Promise<BlogPost[]> {
    return await this.postsService.findAllPosts();
  }

  @ApiOperation({ summary: 'Find a post by ID' })
  @ApiParam({ name: 'id', description: 'ID of the post to find' })
  @ApiResponse({
    status: 200,
    description: 'Post found successfully',
    type: BlogPost,
  })
  @ApiNotFoundResponse({ status: 404, description: 'Post not found' })
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const post = await this.postsService.findOneById(id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({ type: PostDTO, description: 'Post data to create' })
  @ApiCreatedResponse({
    status: 201,
    description: 'Post created successfully',
    type: BlogPost,
  })
  @ApiResponse({ status: 400, description: 'Error creating post' })
  @Post()
  async create(@Body() createPostDTO: PostDTO): Promise<BlogPost> {
    try {
      return await this.postsService.createPost(createPostDTO);
    } catch (error) {
      // Handle validation errors or other potential exceptions
      throw new BadRequestException('Error creating post: ' + error.message);
    }
  }

  @ApiOperation({ summary: 'Update a post by ID' })
  @ApiParam({ name: 'id', description: 'ID of the post to update' })
  @ApiBody({ type: PostDTO, description: 'Updated post data' })
  @ApiResponse({ status: 204, description: 'Post updated successfully' })
  @ApiNotFoundResponse({ status: 404, description: 'Post not found' })
  @Put(':id')
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully updated.',
  })
  async update(@Param('id') id: string, @Body() updatePostDto: PostDTO) {
    const post = await this.postsService.findOneById(id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return await this.postsService.updatePost(id, updatePostDto);
  }

  @ApiOperation({ summary: 'Delete a post by ID' })
  @ApiParam({ name: 'id', description: 'ID of the post to delete' })
  @ApiResponse({ status: 202, description: 'Post deleted successfully' })
  @ApiNotFoundResponse({ status: 404, description: 'Post not found' })
  @Delete(':id')
  @ApiResponse({
    status: 202,
    description: 'The record has been successfully deleted.',
  })
  async remove(@Param('id') id: string) {
    const post = await this.postsService.findOneById(id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return await this.postsService.removeOneById(id);
  }
}
