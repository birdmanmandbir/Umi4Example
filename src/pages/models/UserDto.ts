import { PostDto } from "./PostDto";

export interface UserDto {
  id: string;
  email: string;
  passwordHash: string;
  name?: string;
  posts: PostDto[];
  avatarUrl?: string;
}
