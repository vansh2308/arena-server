import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  comment_text: string;

  @IsOptional()
  @IsUUID()
  parent_comment_id?: string;  // Optional, to create a reply

  @IsUUID()
  stage_id: string;  // The stage the comment is associated with
}
