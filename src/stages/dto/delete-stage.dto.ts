import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteStageDto {
  @IsNotEmpty()
  @IsUUID()
  stage_id: string;
}
