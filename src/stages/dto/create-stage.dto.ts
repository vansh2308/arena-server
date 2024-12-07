import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateStageDto {
  @IsNotEmpty()
  @IsString()
  stage_name: string;

  @IsNotEmpty()
  @IsDateString()
  time: string; // ISO 8601 format for date and time
}
