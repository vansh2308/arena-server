import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('api/stages/:stage_id/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // Create a new comment
  @Post()
  create(@Param('stage_id') stage_id: string, @Body() createCommentDto: CreateCommentDto) {
    createCommentDto.stage_id = stage_id;  // Attach the stage_id to the DTO
    return this.commentsService.create(createCommentDto);
  }

  // Get all comments for a stage, including child comments (nested)
  @Get()
  findAll(@Param('stage_id') stage_id: string) {
    return this.commentsService.findAll(stage_id);
  }

  // Get a single comment by ID, with nested replies
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  // Update a comment's text
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  // Delete a comment
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
