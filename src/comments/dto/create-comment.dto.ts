import { IsString } from 'class-validator';

class CreateComment {
  @IsString()
  body: string;

  @IsString()
  postId: string;
}

export default CreateComment;
