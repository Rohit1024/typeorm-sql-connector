import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './controllers/post.controller';
import { PostsService } from './services/posts.service';
import { AppController } from './controllers/app.controller';
import { BlogPost } from './entities/posts.entity';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './utils/exception-filters';
import { clientOpts } from './db';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.DB_USERNAME as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_DATABASE as string,
      synchronize: true,
      autoLoadEntities: true,
      logging: 'all',
      extra: clientOpts,
    }),
    TypeOrmModule.forFeature([BlogPost]),
  ],
  controllers: [AppController, PostsController],
  providers: [
    PostsService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
