import { IsString, IsUUID } from 'class-validator';

export class UpdateCommentDto {
  @IsString()
  comment_text: string;
}
