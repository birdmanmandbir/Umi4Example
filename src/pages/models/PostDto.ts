import { UserDto } from './UserDto';

export interface PostDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content?: string;
  author: UserDto;
  authorId: string;
  imageUrl?: string;
  tags: string;
}
