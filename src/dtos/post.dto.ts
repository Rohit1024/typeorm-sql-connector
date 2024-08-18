import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostDTO {
  @ApiProperty({
    description: 'Title of the post',
    default: 'My Post',
    type: String,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'SubTitle of the post',
    default: 'My SubTitle Post',
    type: String,
  })
  @IsNotEmpty()
  subTitle: string;

  @ApiProperty({
    description: 'Description of the post',
    default: 'lorem ipsum',
    type: String,
  })
  @IsNotEmpty()
  description: string;
}
