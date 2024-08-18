import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Title of the post',
    default: 'My Post',
    type: String,
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'SubTitle of the post',
    default: 'My SubTitle Post',
    type: String,
  })
  @Column()
  subTitle: string;

  @ApiProperty({
    description: 'Description of the post',
    default: 'lorem ipsum',
    type: String,
  })
  @Column()
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  UpdatedAt!: Date;
}
