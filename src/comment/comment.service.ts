import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stage } from 'src/stages/entities/stage.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    
    @InjectRepository(Stage)
    private readonly stageRepository: Repository<Stage>,
  ) {}

  // Create a new comment
  async create(createCommentDto: CreateCommentDto) {
    const stage = await this.stageRepository.findOne({
      where: { stage_id: createCommentDto.stage_id },
    });
    
    if (!stage) {
      throw new NotFoundException('Stage not found');
    }

    const parentComment = createCommentDto.parent_comment_id
      ? await this.commentRepository.findOne({
          where: { comment_id: createCommentDto.parent_comment_id },
        })
      : null;

    const comment = this.commentRepository.create({
      comment_text: createCommentDto.comment_text,
      parent_comment: parentComment,
      stage: stage,
    });

    return this.commentRepository.save(comment);
  }

  // Get all comments for a stage with nested comments
  async findAll(stage_id: string) {
    const stage = await this.stageRepository.findOne({ where: { stage_id } });

    if (!stage) {
      throw new NotFoundException('Stage not found');
    }

    return this.commentRepository.find({
      where: { stage: stage },
      relations: ['child_comments', 'user'],  // Eager load child comments and user info
    });
  }

  // Get a single comment by ID with nested child comments
  async findOne(id: string) {
    const comment = await this.commentRepository.findOne({
      where: { comment_id: id },
      relations: ['child_comments', 'user'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  // Update comment text
  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.findOne({
      where: { comment_id: id },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    comment.comment_text = updateCommentDto.comment_text;

    return this.commentRepository.save(comment);
  }

  // Delete comment
  async remove(id: string) {
    const comment = await this.commentRepository.findOne({ where: { comment_id: id } });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return this.commentRepository.remove(comment);
  }
}
